# MNEMONIC

A design system.

## Guide

* All markup, css, js, fonts, images, and other assets should be under the `docs` directory.

- - -

### Optimize Images

* All images should be optimized before uploading to staging and production. Only use PNG if the image needs transparency. 

* Use SVG for icons and illustrations if possible. Icon images that look the same and only differ in direction (e.g. arrows) can be sourced from one image and apply CSS transform to flip the image or rotate.

> Read: [Optimize Images](https://developers.google.com/web/tools/lighthouse/audits/optimize-images)

* Use the `<picture>` tag to add images with different mobile and desktop versions by using the `media` attribute.

> Read: [Responsive images with `<picture>`](https://developers.google.com/web/fundamentals/design-and-ux/responsive/images#art_direction_in_responsive_images_with_picture)

- - -

### Minify Resources

* All plugins and libraries should be under the `plugins` directory. Only the minified and compressed js and css from plugins will be linked from the markup. The uncompressed version should also be added on the plugin directory. 

> Read: [Minify Resources](https://developers.google.com/speed/docs/insights/MinifyResources)

- - -

### Deprioritize Render-Blocking Resources

* If you can remove unnecessary lines of codes from plugin dependencies, the better.

* JS files that are not needed for the initial markup rendering should be at the bottom of `</body>` and should contain the `async` attribute. 

> Read: [Render-Blocking Resources](https://developers.google.com/web/tools/lighthouse/audits/blocking-resources)

- - -

### Style Guide

* The `master.css` contains the global styling rules. Use the `template.css` to create custom scss files and comment out necessary stylesheets. Viewport-specific styling rules are separated into `mobile.css`, `desktop.css`, and `tablet.css`.

> Read: [HTML Link Media Attribute](https://www.w3schools.com/tags/att_link_media.asp) 

* The `_tokens.scss` contains the project-specific variables for the theme. 

* The `_plugins.scss` is being imported last as this will contain the plugin overrides.

* All scss rulesets should not be nested more than 3 levels deep. 
Read: [SASS: The Inception Rule](http://thesassway.com/beginner/the-inception-rule)

* Use `@extend` only for similar rulesets for related selectors, and `mixins` for similar rulesets for unrelated selectors.

> Read: [When to use @extend; when to use a mixin](https://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/)  

- - -

##### Supported sizes for background / slider images:

![Supported Responsive Image Sizes](https://i.imgur.com/qNER6pd.jpg)

### Development
* Develop on the `frontend` branch of the project repository.
* Commit your changes by feature, task, or fix. Commit often. Capitalize your commit and describe it properly so any dev can understand it.

> Read: [Git commit Best Practices](https://github.com/trein/dev-best-practices/wiki/Git-Commit-Best-Practices)

- - -

If you have any additional suggestions or see points of improvement, feel free to update this guide.

- - - 