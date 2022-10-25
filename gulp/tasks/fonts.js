import fs from 'fs'
import fonter from 'gulp-fonter'
import ttf2woff2 from 'gulp-ttf2woff2'

// search for otf fonts
export const otfToTtf = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`,{})
    .pipe(app.plugins.gulpPlumber(
        app.plugins.notify.onError({
            title:"FONTS",
           message:"Error <%= error.message %>"
        }))
         )
        // convert them into ttf
        .pipe(fonter({
            formats:['ttf']
        }))
        // move to source folder
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}
// search for ttf fonts
export const ttwToWoff = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`,{})
    .pipe(app.plugins.gulpPlumber(
        app.plugins.notify.onError({
            title:"FONTS",
           message:"Error <%= error.message %>"
        }))
         )
        // convert them into woff
        .pipe(fonter({
            formats:['woff']
        }))
        // move to source folder
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        //search for ttf fonts
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
        // convert them into .woff2
        .pipe(ttf2woff2())
        // move to build folder
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
}

export const fontsStyle = () => {
    // where fonts are conntected
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`
    // check if there fonts files
    fs.readdir(app.path.build.fonts, (err,fontsFiles) => {
        if(fontsFiles){
            // check if file with styles exists
            if(!fs.existsSync(fontsFile)){
                // if no file - create it.
                fs.writeFile(fontsFile, '', cb)
                let newFileOnly
                for(let i = 0; i < fontsFiles.length; i++){
                    let fontFilename = fontsFiles[i].split('.')[0]
                    // write fonts connecting into a file
                    if(newFileOnly !== fontFilename){
                        let fontName = fontFilename.split('-')[0]
                            ? fontFilename.split('-')[0]
                            : fontFilename
                        let fontWeight = fontFilename.split('-')[1]
                            ? fontFilename.split('-')[1]
                            : fontFilename
                    }
                    switch(fontWeight.toLowerCase()){
                        case 'thin':
                            fontWeight = 100
                        case 'extralight':
                            fontWeight = 200
                        case 'light':
                            fontWeight = 300
                        case 'medium':
                            fontWeight = 500
                        case 'semibold':
                            fontWeight = 600
                        case 'extrabold':
                            fontWeight = 800
                        case 'black':
                            fontWeight = 900
                        default:
                            fontWeight = 400
                    }
                    fs.appendFile(fontsFile,
                        `
                        @font-face {
                            font-family: ${fontName};
                            font-display: swap;
                            src: url("../fonts/${fontFilename}.woff") format("woff"), url("../fonts/${fontFilename}.woff2") format("woff2");
                            font-weight: ${$fontWeight};
                            font-style: normal;
                            }
                        `)
                        newFileOnly = fontFilename
                }
            }

        } else {
            console.log(`scss/fonts.scss already exists. Please remove it to update/add new fonts.`)
        }
    })
    return app.gulp.src(`${app.path.srcFolder}`)
    function cb() { }
}