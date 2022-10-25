import gulpPlumber from 'gulp-plumber'
import replace from 'gulp-replace'
import notify from 'gulp-notify'
import browserSync from 'browser-sync'
import newer from 'gulp-newer'

export const  plugins = {
    replace,
    gulpPlumber,
    notify,
    browserSync,
    newer
}
