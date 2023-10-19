async function onSelectedImageChanged(uri) {
  const img = await faceapi.fetchImage(uri)
  $(`#inputImg`).get(0).src = img.src
  updateResults()
}

async function handleOnChangeInput(ele) {
  const imgFile = ele.files[0]
  const spinner=$('.mb-overlay--spinner') ;
  console.log(spinner)
  spinner.show()
  const img = await faceapi.bufferToImage(imgFile);
  spinner.hide() 
  $('.mb-overlay-body-wrap').show()
  $('#inputImg').get(0).src = img.src; 
  $('.mb-overlay').show();

}


async function loadImageFromUrl(url) {
  console.log(url)
  const img = await requestExternalImage($('#imgUrlInput').val())
  $('#inputImg').get(0).src = img.src
  updateResults()
}

async function loadImageFromUpload() {
    const imgFile = $('#queryImgUploadInput').get(0).files[0]
    console.log(imgFile)
    const img = await faceapi.bufferToImage(imgFile)
    console.log(img)
    $('#inputImg').get(0).src = img.src
    updateResults()
}

function renderImageSelectList(selectListId, onChange, initialValue, withFaceExpressionImages) {
  let images = [1, 2, 3, 4, 5].map(idx => `bbt${idx}.jpg`)

  if (withFaceExpressionImages) {
    images = [
      'happy.jpg',
      'sad.jpg',
      'angry.jpg',
      'disgusted.jpg',
      'surprised.jpg',
      'fearful.jpg',
      'neutral.jpg'
    ].concat(images)
  }

  function renderChildren(select) {
    images.forEach(imageName =>
      renderOption(
        select,
        imageName,
        imageName
      )
    )
  }

  renderSelectList(
    selectListId,
    onChange,
    initialValue,
    renderChildren
  )
}

function initImageSelectionControls(initialValue = 'bbt1.jpg', withFaceExpressionImages = false) {
  renderImageSelectList(
    '#selectList',
    async (uri) => {
      await onSelectedImageChanged(uri)
    },
    initialValue,
    withFaceExpressionImages
  )
  onSelectedImageChanged($('#selectList select').val())
}