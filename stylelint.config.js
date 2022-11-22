/**
 * @param {String} block
 * @param {Object} [presetOptions]
 * @param {String} [presetOptions.namespace]
 * @return {RegExp}
 */
const bemSelector = (block, presetOptions) => {
    const ns = (presetOptions && presetOptions.namespace) ? `${presetOptions.namespace}-` : '';
    const WORD = '[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*';
    const element = `(?:__${WORD})?`;
    const modifier = `(?:--${WORD}){0,2}`;
    const attribute = '(?:\\[.+\\])?';
    return new RegExp(`^\\.${ns}${block}${element}${modifier}${attribute}$`);
};

module.exports = {
    extends: 'stylelint-config-recommended-scss',
    plugins: [
        'stylelint-selector-bem-pattern',
    ],
    rules: {
        'plugin/selector-bem-pattern': {
            preset: 'bem',
            componentSelectors: bemSelector,
        },
    },
};
