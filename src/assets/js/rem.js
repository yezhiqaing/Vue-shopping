function adapter(){
    const dpWidth=document.documentElement.clientWidth
    const rootFZ=dpWidth/10
    document.documentElement.style.fontSize=rootFZ+'px'
}
adapter()
window.onresize=adapter