using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Rewrite;

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


app.MapPost("/cards", (Card card, ICardService service) =>

{
    service.AddCard(card);
    return TypedResults.Created("/cards/{id}", card);
})
.AddEndpointFilter(async (context, next) => {
    var cardsArgument = context.GetArgument<Card>(0);
    var errors = new Dictionary<string, string []>();
    if (cardsArgument.createdDate > DateTime.UtcNow)
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

app.Run();

public record Card(int id, string sourcePhrase, string translatedPhrase, DateTime createdDate = default(DateTime)){}


interface ICardService
{
    List<Card> GetCards();
    Card GetCardById(int id);
    Card AddCard(Card card);
    void DeleteCardById(int id);
}

class InMemoryCardService : ICardService
{
    private readonly List<Card> _cards = new List<Card>{
        new(1, "No, I want to play it safe / rather be safe than sorry", "Nein, ich gehe auf Nummer sicher", DateTime.Now),
        new(2, "supernatural", "übernatürlich", DateTime.Now),
        new(3, "to level, flatten", "ebnen", DateTime.Now),
        new(4, "Don't bother", "Lass es", DateTime.Now),
        new(5, "I know from empirical view/observations/contemplation", "Ich weiß aus empirischer Anschauung", DateTime.Now),
        new(6, "to be on the verge, on the brink, about to", "stehen kurz vor", DateTime.Now),
        new(7, "Nothing I had seen of her so far was able to nourish the illusion that the sacred fire of poetry blazed in her", "Nichts, was ich bisher von ihr gesehen hatte, vermochte die Illusion zu nähren, in ihr lodere das heilige Feuer der Dichtkunst", DateTime.Now),
        new(8, "to disarm", "entwaffnen", DateTime.Now),
        new(9, "- How you doing? - Still trapped on the surface of a sphere.", "- Wie geht's? - Auf der Oberfläche einer Kugel gefangen", DateTime.Now),
        new(10, "I'll throw paper planes at whoever I please", "Ich werfe Papierflieger auf wen ich will", DateTime.Now),
    };

    public Card AddCard(Card card)
    {
        _cards.Add(card);
        return card;
    }
    public void DeleteCardById(int id)
    {
        _cards.RemoveAll(cards => id == cards.id);
    }

    public Card? GetCardById(int id)
    {
        return _cards.SingleOrDefault(cards => id == cards.id);
    }

    public List<Card> GetCards()
    {
        return _cards;
    }
}

