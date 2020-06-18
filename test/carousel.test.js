const aem = require('../index');

test('Component Functions - Happy Path', () => {
    let testContent = {
        "jcr:primaryType": "nt:unstructured",
        "sling:resourceType": "core/wcm/components/carousel/v1/carousel",
        "id": "abc",
        "autoplay": true,
        "delay": 300,
        "autopauseDisabled": false,
        "accessibilityLabel": "My Label",
    }

    let carousel = new aem.components.core.Carousel();

    carousel.setAutoplay(true);
    carousel.setDelay(300);
    carousel.setAutopauseDisabled(false)
    carousel.setAccessibilityLabel("My Label");
    carousel.setID("abc");

    expect(carousel.getData()).toStrictEqual(testContent);
});

test('Test basic instantiation', () => {
    let testContent = {
        "jcr:primaryType": "nt:unstructured",
        "sling:resourceType": "core/wcm/components/carousel/v1/carousel"
    }

    let carousel = new aem.components.core.Carousel();

    expect(carousel.getData()).toStrictEqual(testContent);
});