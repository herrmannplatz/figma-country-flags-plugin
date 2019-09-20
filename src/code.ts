figma.showUI(__html__, {width: 350, height: 400});

figma.ui.onmessage = msg => {
  if (msg.type === 'create-flag') {
    const icon = figma.createNodeFromSvg(msg.svg);
    const scaleFactor = 1 / 8;
    icon.resize(icon.width * scaleFactor, icon.height * scaleFactor);
    icon.x = figma.viewport.center.x;
    icon.y = figma.viewport.center.y;
    figma.currentPage.selection = [icon];
  }
  figma.closePlugin();
};
