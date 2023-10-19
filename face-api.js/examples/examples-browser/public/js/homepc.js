
  function handleSwitch(ele){
    const qrCode=$('.qr-for-coser');

    if(ele.checked){
        qrCode.show()
    }else{
        qrCode.hide()
    }
}