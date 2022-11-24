module.exports = {
    'src/**/*.{js,vue,ts}': ['npm run lint', 'git add'],
    'src/**/*.{vue,scss,css}': ['npm run lint:css', 'git add'],
};
