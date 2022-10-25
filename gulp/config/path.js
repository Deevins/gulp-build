import * as nodePath from 'path'
const rootFolder = nodePath.basename(nodePath.resolve())


const buildFolder = './dist'
const srcFolder = './src'


export const path = {
    build:{
        html:`${buildFolder}/`,
        css:`${buildFolder}/css/`,
        js:`${buildFolder}/js/`,
        images:`${buildFolder}/img/`,
        fonts:`${buildFolder}/fonts/`,
        files:`${buildFolder}/files/`
    },
    src:{
        html:`${srcFolder}/*.html`,
        images:`${srcFolder}/img/**/*.{png,gif,jpg,jpeg,webp}`,
        svg:`${srcFolder}/img/**/*.svg`,
        scss:`${srcFolder}/scss/style.scss`,
        js:`${srcFolder}/js/app.js `,
        // html:`${srcFolder}/*.pug`,
        files:`${srcFolder}/files/**/*.*`,
  },
    watch:{
        html:`${srcFolder}/**/*.html`,
        // html:`${srcFolder}/**/*.pug`,
        scss:`${srcFolder}/scss/**/*.scss`,
        images:`${srcFolder}/img/**/*.{png,gif,jpg,jpeg,webp,svg}`,
        js:`${srcFolder}/js/**/*.js`,
        files:`${srcFolder}/files/**/*.*`
    },
    clean:buildFolder,
    buildFolder,
    srcFolder,
    rootFolder,
    ftp:''
}