import $ from 'jquery';

export function createListingService(data, userId, callback){
  let formData = new FormData();
  formData.append("image", data.image)
  $.ajax({
    type:'POST',
    url: 'https://api.imgur.com/3/image',
    data: formData,
    crossDomain: true,
    processData: false,
    contentType: false,
    headers: {
      Authorization: 'Client-ID ' + IMGUR_API_ID,
      Accept: 'application/json'
    },
    mimeType: 'multipart/form-data',
  })
  .then(response=>{
    response = JSON.parse(response)
    $.post('/listing', {
      title: data.title,
      desc: data.desc,
      loc: data.loc,
      userId: userId,
      image: response.data.link
    })
    .then(serverRes=>{
      callback(serverRes);
    })
    .catch(error=>{
      callback(error);
    })
  })
  .catch(error=>{
    callback(error);
  })
}

export function listingInterestService(id, user, claimed ,callback){
  $.ajax({
    type:'PUT',
    url: '/interest',
    data: {
      id: id,
      claimed: claimed,
      userId: user,
    },
  })
  .then(response=>{
    callback(response);
  })
  .catch(error=>{
    callback(error);
  })
}

export function deleteListingService(id, callback){
  $.ajax({
    type:'DELETE',
    url: `/listing/${id}`,
  })
  .then(response=>{
    callback(response);
  })
  .catch(error=>{
    callback(error);
  })
}

export function updateListingService(listing, oldListing, callback){
  console.log(listing)
  console.log(oldListing)
  if(listing.image === oldListing.image){
    updateListing(listing, oldListing, callback)
  } else {
  let formData = new FormData();
  formData.append("image", listing.image)
  console.log(formData);
  $.ajax({
    type:'POST',
    url: 'https://api.imgur.com/3/image',
    data: formData,
    crossDomain: true,
    processData: false,
    contentType: false,
    headers: {
      Authorization: 'Client-ID ' + IMGUR_API_ID,
      Accept: 'application/json'
    },
    mimeType: 'multipart/form-data',
  })
  .then(response=>{
    response = JSON.parse(response);
    listing.image = response.data.link;
    updateListing(listing, oldListing, callback)
  })
  .catch(error=>{
    callback(error);
  })
  }
}

function updateListing(listing, oldListing, callback) {
  $.ajax({
    type:'PUT',
    url: `/listing/${oldListing._id}`,
    data: {
      title: listing.title,
      desc: listing.desc,
      loc: listing.loc,
      image: listing.image
    }
  })
  .then(response=>{
    callback(response);
  })
  .catch(error=>{
    callback(error);
  })
}

export function givawayListingService(input, callback){
  console.log(input.receiver)
  $.post('/listing/give', {
    receiver: input.receiver,
    listing: input.listing
  })
  .then(response=>{
    callback(response);
  })
  .catch(error=>{
    callback(error);
  })
}