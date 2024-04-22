using System.Data;
using System.Globalization;
using System.Text.Json;
using Microsoft.AspNetCore.Http.HttpResults;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<ICardService>(new InMemoryCardService());

var app = builder.Build();

app.Use(async (context, next) => {
    Console.WriteLine($"[{context.Request.Method} {context.Request.Path} {DateTime.UtcNow}] Started.");
    await next(context);
    Console.WriteLine($"[{context.Request.Method} {context.Request.Path} {DateTime.UtcNow}] Finished.");
});

app.MapGet("/", () => "Backend API is running.");

var cards = new List<Card>();
    
app.MapGet("/cards", (ICardService service) => service.GetCards());

app.MapGet("/cards/{id}", Results<Ok<Card>, NotFound> (int id, ICardService service) =>
{
    var targetCard = /*cards.SingleOrDefault(t => id == t.id )*/service.GetCardById(id);
    return targetCard is null
        ? TypedResults.NotFound()
        : TypedResults.Ok(targetCard);
});

app.MapGet("/loadOldFile", (ICardService service) => service.AppendBatch());

app.MapPost("/cards", (Card card, ICardService service) =>
{   
    service.AddCard(card);
    return TypedResults.Created("/cards/{id}", card);
})
.AddEndpointFilter(async (context, next) => {
    var cardsArgument = context.GetArgument<Card>(0);
    var errors = new Dictionary<string, string []>();
    if (cardsArgument.CreatedDate > DateTime.UtcNow)
    {
        errors.Add("nameof(Cards.dueDate)",["Cannot have a created date in the future."]);
    }
    if (errors.Count > 0)
    {
        return Results.ValidationProblem(errors);
    }
    return await next(context);
});

app.MapDelete("/cards/{id}", (int id, ICardService service) =>
{
    service.DeleteCardById(id);
    return TypedResults.NoContent();
});

app.MapPut("/cards", (Card card, ICardService service) =>
{
    service.UpdateCardById(card);
});

app.MapPut("/cards/batch", (List<Card> cards, ICardService service) =>
{
    service.BatchUpdate(cards);
});

app.Run();

public record Card(int Id, string SourcePhrase, string TranslatedPhrase, DateTime CreatedDate = default(DateTime), DateTime LastTestedDate = default(DateTime)){}
interface ICardService
{
    List<Card> GetCards();
    Card GetCardById(int id);
    Card AddCard(Card card);
    void DeleteCardById(int id);
    void UpdateCardById(Card card);

    void BatchUpdate(List<Card> cards);
    void AppendBatch(); // for test purposes, for files from the old C++ application
}

class InMemoryCardService : ICardService
{
    private List<Card> _cards = new List<Card>{
        new(1, "No, I want to play it safe / rather be safe than sorry", "Nein, ich gehe auf Nummer sicher", DateTime.Now),
        new(2, "supernatural", "übernatürlich", DateTime.Now),
        new(3, "to level, flatten", "ebnen", DateTime.Now),
        new(4, "Don't bother", "Lass es", DateTime.Now),
        new(5, "I know from empirical view/observations/contemplation", "Ich weiß aus empirischer Anschauung", DateTime.Now),
        new(6, "to be on the verge, on the brink, about to", "stehen kurz vor", DateTime.Now),
        new(7, "Nothing I had seen of her so far was able to nourish the illusion that the sacred fire of poetry blazed in her", "Nichts, was ich bisher von ihr gesehen hatte, vermochte die Illusion zu nähren, in ihr lodere das heilige Feuer der Dichtkunst", DateTime.Now),
        new(8, "to disarm", "entwaffnen", DateTime.Now),
        new(9, "-   How you doing? - Still trapped on the surface of a sphere.", "- Wie geht's? - Auf der Oberfläche einer Kugel gefangen", DateTime.Now),
        new(10, "I'll throw paper planes at whoever I please", "Ich werfe Papierflieger auf wen ich will", DateTime.Now),
    };

    public InMemoryCardService()
    {
        ReadFromFile();
    }

    string _filePath = "cards.json";

    public Card AddCard(Card card)
    {
        // find and assign a unique id    
        // We shouldn't / can't directly update the id in a record
        var c = new Card(GetNewID(),
            card.SourcePhrase,
            card.TranslatedPhrase,
            card.CreatedDate,
            card.LastTestedDate);
            
        _cards.Add(c);
        SaveToFile();
        return c;
    }

    private int GetNewID()
    {
        return _cards.Count == 0 ? 1 : _cards.Max(c => c.Id) + 1;
    }

    private void SaveToFile(){
        var jsonString = JsonSerializer.Serialize(_cards);
        File.WriteAllText(_filePath, jsonString);
    }
    private void ReadFromFile(){

        if (File.Exists(_filePath))
        {
            var jsonString = File.ReadAllText(_filePath);
            _cards = JsonSerializer.Deserialize<List<Card>>(jsonString);
        }
        
        // We can also append an old-format file, if one is available:
        AppendBatch();
        
        // else, we still have the sample 10 items for new users
    }

    public void DeleteCardById(int id)
    {
        _cards.RemoveAll(c => id == c.Id);
        SaveToFile();
    }

    public void DeleteAllCards()
    {
        _cards.Clear();
        SaveToFile();
    }

    public void UpdateCardById(Card card){
        _cards[_cards.FindIndex(c => card.Id == c.Id)] = card;      
        SaveToFile();
    }

    public void BatchUpdate(List<Card> cards){
        foreach (var card in cards)
        {
            var index = _cards.FindIndex(c => c.Id == card.Id);
            if (index != -1)
            {
                _cards[index] = card;
            }
        }
        SaveToFile();
    }

    public Card? GetCardById(int id)
    {
        return _cards.SingleOrDefault(card => id == card.Id);
    }

    public List<Card> GetCards()
    {
        return _cards;
    }

    private DateTime OldDateTimeConversion(long oldDateTime)
    {
        return DateTimeOffset.FromUnixTimeSeconds(oldDateTime).DateTime;
    }

    // Support method for adding batches of translations from the old C++ application
    public void AppendBatch()
    {
        // Read the contents of a text file into an array, where each record consists of:
        // - two strings
        // - a datetime stamp
        // - then the last of a series of datetime stamps, all separated by a "|" character
        // - and ending in a new line 

        string oldFilePath = "batch.txt";
        if (File.Exists(oldFilePath))
        {
            var lines = File.ReadAllLines(oldFilePath);

            // get the highest id in the current list
            foreach (var line in lines)
            {
                var parts = line.Split('|');
                if (parts.Length >= 2)
                {
                    // (We don't need all of the old data for this app)
                    var sourcePhrase = parts[0];
                    var translatedPhrase = parts[1];

                    var createdDate = DateTime.Now;
                    var lastTestedDate = default(DateTime);
                    
                    // test whether sourcePhrase and translatedPhrase are BOTH already in the cards array
                    if (_cards.Any(c => c.SourcePhrase == sourcePhrase && c.TranslatedPhrase == translatedPhrase))
                    {
                        // skip this
                        continue;
                    }

                    if (parts.Length > 2) // if we also have existing timestamps, use them
                    {
                        createdDate = OldDateTimeConversion(long.Parse(parts[3]));
                        lastTestedDate = OldDateTimeConversion(long.Parse(parts[^2]));
                    }
                    var card = new Card(GetNewID(), sourcePhrase, translatedPhrase, createdDate, lastTestedDate);

                    _cards.Add(card);
                }
            }

            SaveToFile();
        }
    }
}


