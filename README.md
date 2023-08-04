    =====>    Don't change this file without informing     -- Jasmeet S.         <=====
    
<!-- Set PORT=3000 in package.json start command -->

\*\* Guide to run the project on local

    ** After cloning run - npm install -> installed all the dependencies

    ** Make sure you are on Dev branch, if not use => git checkout 'Dev'

    ** To start development server : npm start

    ** To make a production build : npm run build   - Not for this project

    ** To minify the files and not show your code in INSPECT tab : Create a .env file in your root folder and add GENERATE_SOURCEMAP=false

    ** For latest changes use - git pull

    ** To push changes
        git status
        git commit -m 'Message'
        git add .
        git push

\*\* Coding Standards

    - Fonts -> camelCasing
    - Use index.css for common styles. (which could be used everywhere)
    - Create new CSS for Sepecific pages if required only in the same folder structure of component.

\*\* Folder Structure Guide

    -   Static files, images etc => swagimals/public folder
    -   Components => swagimals/src/components/{RespectiveComponet}
            - (Create new folder if required)
            - Keep related components in same folder

Please ask if any doubts


