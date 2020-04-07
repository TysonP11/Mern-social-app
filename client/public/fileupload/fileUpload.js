FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginFileEncode
);

FilePond.setOptions({
  imageResizeTargetWidth: 200,
  imageResizeTargetHeight: 200,
  allowImageResize: true,
  stylePanelAspectRatio: 200 / 200,
});

FilePond.parse(document.body);
