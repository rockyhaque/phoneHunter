const loadPhone = async(searchText, isShowAll) => {
    const res = await fetch(`
    https://openapi.programming-hero.com/api/phones?search=${searchText}
    `);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phone);

    // 1. get the div
    const phoneContainer = document.getElementById('phone-container');

    // clear phone container before adding new cards
    phoneContainer.textContent = '';

    // Display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
      showAllContainer.classList.remove('hidden');
    } else{
      showAllContainer.classList.add('hidden');
    }

    console.log('is show all', isShowAll);

    // Display only first 12 phones if not show all
    if(!isShowAll){
      phones = phones.slice(0, 12);
    }


    phones.forEach(phone =>{
        console.log(phone);

        // 2. Create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;

        // 3. Set inner HTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body text-black">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-info">Show Details</button>
          </div>
        </div> 
        
        `;

        // 4. Append Child
        phoneContainer.appendChild(phoneCard);
    });

    // hide loading spinner
    toggleLoadingSpinner(false);

}

const handleShowDetail = async (id) => {
  console.log('id clicked', id);
  // Load Single Data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  console.log(data);
}

// handle search
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden');
  } else{
    loadingSpinner.classList.add('hidden');
  }
}


// Handle Show All
const handleShowAll = () => {
    handleSearch(true);
}


// loadPhone();