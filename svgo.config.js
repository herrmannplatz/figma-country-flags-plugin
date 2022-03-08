module.exports = {
  plugins: [
    "preset-default",

    /**
     * plugin that replaces all cloned nodes with the original node
     */
    {
      type: "visitor",
      name: "convertClones",
      fn: () => {
        const elements = [];

        return {
          element: {
            enter: (node) => {
              elements.push(node);
            },
          },
          root: {
            exit: () => {
              for (const element of elements) {
                if (element.name !== "use") {
                  continue;
                }

                const referenceElement = elements.find((el) => {
                  const id = element.attributes["xlink:href"]?.replace("#", "");
                  if (id == null) {
                    return;
                  }
                  return el.attributes.id === id;
                });

                if (referenceElement == null) {
                  continue;
                }

                const { transform: cloneTransform, ...elementAttributes } =
                  element.attributes;
                const {
                  transform: referenceTransform,
                  ...referenceAttributes
                } = referenceElement.attributes;

                element.name = referenceElement.name;
                element.attributes = {
                  ...referenceAttributes,
                  ...elementAttributes,
                };
                element.attributes.transform = [
                  cloneTransform,
                  referenceTransform,
                ]
                  .filter(Boolean)
                  .join(" ");
                element.children = referenceElement.children;

                delete element.attributes.id;
                delete element.attributes.width;
                delete element.attributes.height;
                delete element.attributes["xlink:href"];
              }
            },
          },
        };
      },
    },
  ],
};
