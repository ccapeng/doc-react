# HTML Document with React

It's for some well formatted html document and want to put them together. 

There are some other react base document management. 
Gatsby is another kind of headless CMS, but still need to have strong skill of react.
In the project, you will find how easy to incorporate html document and to further customization.

In the project directory, you can run `npm start`.  
[Live demo in heroku](https://doc-react.herokuapp.com/)

## How to put up your document?

- Put all resources (html, css, image) into `public/assets`.

- Define `docs.json` under `public/assets` like the following :
  ```
  {
    "header": "UI Componenet Document",
    "sections" : [
      {
        "id" : "components",
        "subheader" : "Components", 
        "topics" : [
          { 
            "name" : "Avatar", 
            "id" : "avatar", 
            "items" : [
              {
                "title" : "Icon",
                "url" : "assets/docs/components/avatar/avatar-icon-md.html"
              },
              ...
            ]
          },
          ...
        ]
      }
      ...
    ]
  }
  ```
- It's UI componenet docuemnt in the project.  
  All components are base on bootstrap.