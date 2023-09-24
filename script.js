let pageCount = 1

async function getArt(page){
    const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`)
    const art = await response.json()
    return art
}

console.log(getArt())

async function loadArt(){
    let info = await getArt(pageCount)
    console.log(info.data)
    document.getElementById('container').style.paddingTop="50px";
    document.getElementById("paintings").innerHTML = ""
    document.getElementById("paintings").className = "container"
    for(let i = 0; i < info.data.length; i+=3){
        let image_id1 = info.data[i].image_id
        let id2 = i+1
        let image_id2 = info.data[i+1].image_id
        let id3 = i+2
        let image_id3 = info.data[i+2].image_id
        document.getElementById("paintings").innerHTML += "<div class='row'><div class='d-flex justify-content-center align-items-center col-lg-4'><img onclick='artInfo(" + i + ", " + pageCount + ");' class='artImg' src='https://www.artic.edu/iiif/2/" + image_id1 + "/full/843,/0/default.jpg' alt=''></div><div class='d-flex justify-content-center align-items-center col-lg-4'><img onclick='artInfo(" + id2 + ", " + pageCount + ")' class='artImg' src='https://www.artic.edu/iiif/2/" + image_id2 + "/full/843,/0/default.jpg' alt=''></div><div class='d-flex justify-content-center align-items-center col-lg-4'><img onclick='artInfo(" + id3 + ", " + pageCount + ")' class='artImg' src='https://www.artic.edu/iiif/2/" + image_id3 + "/full/843,/0/default.jpg' alt=''></div></div>"
    }
    document.getElementById("message").style.visibility = "visible"
    document.getElementById("display").style.visibility = "hidden"
    document.getElementById("info").style.visibility = "visible"
}

async function artInfo(id, page){
    let info = await getArt(page)
    let image_id = info.data[id].image_id
    let artist = info.data[id].artist_display
    let title = info.data[id].title
    let medium = info.data[id].medium_display
    let description = info.data[id].description
    if(description == null){
        description = "No description"
    }
    let html = "<div class='card m-1'><h5>Artist: " + artist + "</h5><h5>Title: " + title + "</h5><h5>Medium: " + medium + "</h5><span><h5>Description: </h5>" + description + "</span></div>"
    document.getElementById("paintings").innerHTML = "<div class='row'><div class='d-flex justify-content-center col-lg-6'><img class='m-1 soloImg' src='https://www.artic.edu/iiif/2/" + image_id + "/full/843,/0/default.jpg' alt=''></div><div class='col-lg-6'>" + html + "</div></div>"
    document.getElementById("display").style.visibility = "visible"
    document.getElementById("display").innerHTML = "Go Back"
    document.getElementById("message").style.visibility = "hidden"
    document.getElementById("info").style.visibility = "hidden"
}

let next = () =>{
    pageCount++
    loadArt()
}

let prev = () =>{
    if(pageCount < 1){
        pageCount = 1
    }
    else{
        pageCount--
    }
    loadArt()
}

    
