
<div style="margin: 20px 0px 20px 0px;">
    <img style="vertical-align: top; margin: 5px 15px 5px 5px;" src="./src/favicon.svg" alt="favicon" width="10%" />
    <img src="./screenshot.png" alt="drawing" width="85%" alt="screenshot"/>
</div>

# LanguageLearn

This project was originally generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.3, and currently working with **18.0.3**. In addition it now contains a .NET Core 8 C# project for an in memory back end.

This is a project to practice and consolidate Angular development, including **Angular Materials**, and the **Jest** framework.
It reimagines a previous application, LanguageLearn, that I wrote in C++ for my own desktop Windows environment and occasionally ported for newer versions of Visual Studio. This new application will be simplified however. The original idea was to create a spaced repetition system that tracked the user's success in recalling phrases translating between English and German and offered them more frequently if the user was having trouble with them.

I still use the original system every day, using a database of 33000 words and phrases I've built up over the years. Much of the original functionality turned out to be superfluous though, and I use it in a simpler way than I originally envisaged. This project reimagines the application more simply, and so that it will no longer be dependent on running on my desktop PC and could be used on the go.

## Learnings from the original system

- It became apparent as the contents of cards became more ambitious that it wasn't appropriate or useful to judge success or failure in recalling individual items any more.
- A system that offers all due items simultaneously is better than one that offers translations in sequence, because it allows the user to visually go back and forwards between due items to their own satisfaction and reinforce items that need more reinforcing.
- Metrics of overall success or progress aren't useful, motivational or necessary to me - this isn't Duolingo.
- The original application never offered editing for phrases, which had to be added or edited in a raw text file where they were stored.

## Dark mode prototype (Figma)

The prototype is modelled [here](https://www.figma.com/proto/VPPIUsvDk7BpsdHxu2XUF5/Language-Learn---dark-mode?content-scaling=fixed&embed_host=share&kind=proto&node-id=3-160&node-type=frame&page-id=0%3A1&scaling=min-zoom&starting-point-node-id=2%3A2&t=FY3sOTpSIMzeV01E-1) in Figma. The only functional button here is the switch between light mode and dark mode (click "Light mode").

In this prototype hover effects are not modelled - but the second translation in the list shows the appearance when one hovers over an item.

## To do

- Jest support has been temporarily dropped, because there isn't at the time of the Angular 18 release a version that will work with it.
- Style differs between the home screen and the dialogs, as the dialogs are using Angular Materials styling. In everyday use, where no dialogs need to be opened, this isn't apparent.

## Install other necessary components

`npm i jest @types/jest jest-preset-angular`

`ng add @angular/material`

`npm i @angular/material-moment-adapter`

`npm i moment`

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
