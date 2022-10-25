import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import rename from 'gulp-rename'
import groupCssMediaQueries from 'gulp-group-css-media-queries'
import webpcss from 'gulp-webpcss'
import autoPrefixer from 'gulp-autoprefixer'
import GulpCleanCss from 'gulp-clean-css'



const sass = gulpSass(dartSass)

export const scss = () => {
    return app.gulp.src(app.path.src.scss, {sourcemaps:true})
        .pipe(app.plugins.gulpPlumber(
         app.plugins.notify.onError({
             title:"SCSS",
            message:"Error <%= error.message %>"
         }))
          )
        .pipe(app.plugins.replace(/@img\//g,'img/'))
        .pipe(sass({
                    outputStyle:'expanded'
                }))
        .pipe(groupCssMediaQueries())
        .pipe(webpcss({
            webpClass:'.webp',
            noWebpClass:'.no-webp'
        }))
        .pipe(autoPrefixer({
            grid:true,
            overrideBrowserList:['last 3 versions'],
            cascade:true
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(GulpCleanCss())
        .pipe(rename({extname:'.min.css'}))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browserSync.stream())
}