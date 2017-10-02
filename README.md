# 🎁 GetMeA.Gift

Starter project to easily bootstrap a React app served up with Express. Also uses [custom-react-scripts](https://github.com/kitze/custom-react-scripts) to add optional support for ES6 decorators, SASS/SCSS, LESS, Stylus, & CSS modules without needing to eject out of Create React App.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes. See Deployment for notes on how to deploy the project to Heroku.

## Installing

Install all dependencies with one command.
```
npm run setup
```

## Running for development

This will start the client at http://localhost:3000 which will proxy the api server that is running at http://localhost:3001. The proxy will allow you to make ajax requests to a relative url (such as '/api/hello') from the client and it will route that request to the api server. This proxy only runs during development.
```
npm start
```

## WishListPage.js "Documentation"
The first thing you see on WishListPage.js is 35 lines of imports.  Almost ALL  of these imports come from `material-ui.com`

Below all the imports - you will see a `const style` variable. This variable holds the "style" object and is where most of the styles are accessed.  You can use, add and edit properties in this variable for later use.

Examples on accessing `style` properties:
`style.listStyle`
`style.paperStyle`
`style.dividerStyle`



Below the `style` variable there is the `WishListPage` component. This component takes up 356 lines and is where most of the application logic is stored.

All neccessary data is pulled from the (mongo) database and stores the data in the state for DOM rendering. The state of this component includes 10 variables and include:

## userData:
Default key is null. Upon rendering the getUserData() (line 135) function is called and the null state is changed to an array of data holding user data.  One of the array properties is another array of list data that is used for the currentList state.

## currentList:
Default key is null. Upon rendering, the renderMessages() function is run and sets the currentList to equal to one of the userData array indexes. the renderMessages() function is very misleading as there are no actual messages to render. The title does not describe the function. glhf

## purchasedItems
Default state is an empty array. When the WishListPage component renders, any previously claimed gifts will be put into this array and will be rendered in the DOM under the 'purchased items' tab in the wishlist

## deleteOpen:
Default state is set to false. When this state is set to 'true', it will trigger the modal to pop up. In this case, the modal is the 'are you sure you want to delete this list?' modal. NOT for deleting an item. But for deleting a LIST.

## shareOpen:
Default state is set to false. When this state is set to 'true', it will trigger the modal to pop up. In this case, the modal is the 'share list' modal.

## addListOpen:
Default state is set to false. When this state is set to 'true', it will trigger the modal to pop up. In this case, the modal is the addList modal for when you are adding new lists to your list of lists. Always remember. Our lists are lists of lists inside of lists for lists in our wish list app.

## showPurchased:
Default state is set to false. The most important place this is used is on WishListPage.js line 201.  There is a ternary operator asking "Is showPurchased equal to true? i.e. "Am I on the wanted items list or the purchased items list?"

So basically this variable is what tells the DOM whether to render the wantedItems list or the purchasedItems list  


#######################################################################################
##                          TOO LONG, DIDN'T READ                                    ##
#######################################################################################
TL:TR
100% of the front end was made using 'material-ui'. Which is just some kind of 'material' framework

There is some CSS used - but it is all used in conjunction with the Material-Ui way of doing things.

Everything else is react, express, nodeJS or mongo.

Material-Ui Documentation: http://www.material-ui.com/#/
React Documentation: https://reactjs.org/docs/hello-world.html
Express Documentation: https://expressjs.com/en/guide/routing.html
nodeJS Documentation:
Mongo Documentation: https://docs.mongodb.com/manual/
