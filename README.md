# Project Title

## 1. Project Description
* This browser-based web application is for people to stay in touch with community and share supplies in times of weather-related emergencies.
* Features:
*
* Message Board:
* - users can post messages
* - users can delete their own messsages
* - users can read all messages posted by other users
* - next and previous buttons prevent the user from having to scroll through messages infinitely
*
* Search for Supplies:
* - users can search for an item in the list to see which other users have that item to share
* - users can click on the profile of people with that item to contact them
*
* Share Supplies:
* - this page can be accessed from the home page "Share Supplies" option
* - this page can also be accessed from the user profile through the "edit items" button
* - users can check off which items they have
* - users can uncheck items they no longer have available
* - users can add an item to their list of available supplies if it's not on the list
*
* Profile:
* - users can add/edit their profile picture
* - users can edit their name, neighbourhood, city, and phone number

## 2. Names of Contributors
List team members and/or short bio's here... 
* Kate Sullivan
* Grace Su
* Oceaan Pendharkar 
* Note: all team members contributed to all aspects of the project, with the exception of Grace, who did all of the nice-looking visual design elements 
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* Adobe Illustrator (used by Grace to create graphics and logo)
* Google Material Icons were used for the icons

## 4. Complete setup/installion/usage
You don't need to know much to use this application!
* hosted link: https://dtc07-4a4f6.firebaseapp.com/ 
* Sign in: click "sign up" and follow the prompts 

* Click "Share Supplies" from the home page to display items you have available. These will be searchable by other users.

* Click "Find Supplies" from the home page to search for items you're looking for from the dropdown list. 
* - From here you can click on other users' profiles who have that item to see their contact information.

* Click "Message Board" to go to the message board. 
* - You can post a message on this page.
* - You can read all the messages other users have posted on this page.
* - Messages that provide information have a blue "information" label.
* - Messages from folks looking for help have an orange "help needed" label.
* - You can click "contact user" to see that user's profile information.

* The bottom nav bar home icon brings you to the home page.
* The bottom nav bar "person" icon brings you to your profile page, where you can edit your personal information.

## 5. Known Bugs and Limitations
Here are some known limitations:
* We took out the option to search for an item by typing because of the possibility of user error. However, this means that when users add an item to the list of supplies they have to share that isn't on our provided list, the only way people can see that they have that item is when they go to their profile (either through the message board or through "find supplies"). 
* There is no way to select all the checkboxes or un-select all the checkboxes on the "edit items"/"share supplies" page
* The styling of the items is not consistent through the items on "edit items"/"share items" page
* Our image at the top of the message board is still the placeholder image instead of the logged in user's image.

## 6. Features for Future
What we'd like to build in the future:
* We would like to add a map feature for users to be able to select their general location (with security measures in place) rather than type in a neighbourhood, which leaves room for user error and is not as useful.
* We would like to add an option to uncheck all boxes or check all boxes on the "edit items" page.
* We would like to add a direct message feature so that users can message each other directly through the app without using the public message board.
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── frame                    # Folder for header, nav, footer
├── html                     # Folder for our main pages
├── images                   # Folder for images
├── scripts                  # Folder for scripts
├── styles                   # Folder for styles
├── .firebaserc              # selects which firebase project for hosting
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
├── login.html               # login page
├── main.html                # home page
├── 404.html                 # message from firestore for when a page can't be found
├── firebase.json            # defines which files to use for hosting
├── firebase.indexes.json
├── firebase.rules           # defines firestore rules
├── firestore.rules          # defines storage rules
└── README.md


It has the following subfolders and files:
├── .gitignore               # files to ignore for git repo

├── frame                    # Folder for header, nav, footer
    footer.html              # footer
    header.html              # header
    nav.html                 # top nav

├── html                            # Folder for our main pages
    ihave.html                      # the items a user has (edit items/share supplies)
    ineed.html                      # the items a user needs (search for supplies)
    messageboard.html               # message board
    profile.html                    # user profile
    profilelistwithresource.html    # the list of profiles with an item after searching
    public_profile.html             # when a user wants to see another user's profile
    template.html                   # a template for our pages (kept for future use)
    thanksresourcesupdate.html      # thank you page after updating supplies list

├── images                   # Folder for images
    back.png                 # Acknowledge sources
    background2.svg
    home_button.png
    ihave.svg
    ineed.svg
    login-background.svg
    logo-main.svg
    logo-ready.svg
    logo.png
    logo.svg
    message.svg
    profile.png
    search.png
    sos.png
    userplaceholder.jpeg

├── scripts                     # Folder for scripts
    authentication.js           # user authentication/login
    firebaseAPI_TEAM07.js       # our firebase keys
    ihave.js                    # edit items/share supplies functions
    ineed.js                    # search for items functions
    main.js                     # home page functions
    message.js                  # message board functions
    profile.js                  # user profile functions
    profilelistwithresource.js  # page with list of users who have an item functions
    public_profile.js           # populate public profile functions
    skeleton.js                 # load nav, footer, header function

├── styles                   # Folder for styles
    ihave.css                   # edit items/share supplies style
    ineed.css                   # search for items style
    main.css                    # home page style
    messageboard.css            # message board style
    profile.style               # user profile style
    profilelistwithresource.css # page with list of users who have an item style
    public_profile.css          # public profile style
    style.css                   # overall theme style
    welcome.css                 # welcome page style (now called index.html)

```


