import { fetchRandomUsersData } from './fetchRandomUsers.js';

const userProfilesContainer = document.querySelector('.userProfilesContainer');
const users = document.createElement('div');
users.setAttribute('class', 'users');
userProfilesContainer.appendChild(users);
let currentPage = 1;
let selectedGender = null;

function createUserImage(userImage, userFullName) {
  const userImg = document.createElement('img');
  userImg.setAttribute('class', 'userProfile__img');
  userImg.src = userImage;
  userImg.alt = `Profile Picture for user ${userFullName}`;

  return userImg;
}

function createUserName(userFullName, gender) {
  const userName = document.createElement('div');
  userName.setAttribute('class', 'userProfile__info__name');

  if (gender === 'female') {
    userName.innerHTML = `<i class="fas fa-user-circle"></i> ${userFullName}`;
  } else if (gender === 'male') {
    userName.innerHTML = `<i class="fas fa-user-circle"></i> ${userFullName}`;
  }

  return userName;
}

function createUserAge(age) {
  const userAge = document.createElement('div');
  userAge.setAttribute('class', 'userProfile__info__age');
  userAge.innerHTML = `<i class="fas fa-fw fa-birthday-cake"> </i> ${age}`;
  return userAge;
}
function createUserGender(gender) {
  const userGender = document.createElement('div');
  userGender.setAttribute('class', 'userProfile__info__gender');
  if (gender === 'female') {
    userGender.innerHTML = `<i class="fas fa-fw fa-venus"> </i> Female`;
  } else if (gender === 'male') {
    userGender.innerHTML = `<i class="fas fa-fw fa-mars"> </i> Male `;
  } else {
    userGender.innerHTML = `Gender: Unknown`;
  }
  return userGender;
}

function createUserEmail(email) {
  const userEmail = document.createElement('div');
  userEmail.setAttribute('class', 'userProfile__info__email');
  userEmail.innerHTML = `<i class="fas fa-fw fa-envelope"> </i> ${email}`;
  return userEmail;
}

function createUserlocation(location) {
  const userLocation = document.createElement('div');
  userLocation.setAttribute('class', 'userProfile__info__location');
  userLocation.innerHTML = `<i class="fas fa-fw fa-globe-americas"></i> ${location}`;

  return userLocation;
}

function createUserProfile(gender) {
  const userProfile = document.createElement('div');
  userProfile.setAttribute('class', 'userProfile');

  if (gender === 'female') {
    userProfile.setAttribute('class', 'userProfile userProfile__female');
    userProfile.setAttribute('data-gender', 'female');
  } else if (gender === 'male') {
    userProfile.setAttribute('class', 'userProfile userProfile__male');
    userProfile.setAttribute('data-gender', 'male');
  }
  return userProfile;
}

export function sortUsersByGender(gender) {
  const genderSortSelect = document.getElementById('genderSort');
  genderSortSelect.addEventListener('change', (event) => {
    selectedGender = event.target.value;
    localStorage.setItem('selectedGender', selectedGender);

    const userProfiles = document.querySelectorAll('.userProfile');
    userProfiles.forEach((userProfile) => {
      const userProfileGender = userProfile.getAttribute('data-gender');
      if (selectedGender === 'reset') {
        userProfile.style.display = 'flex';
      } else if (selectedGender === 'male' || selectedGender === 'female') {
        if (userProfileGender === selectedGender) {
          userProfile.style.display = 'flex';
        } else {
          userProfile.style.display = 'none';
        }
      } else {
        userProfile.style.display = 'none';
      }
    });
  });

  selectedGender = localStorage.getItem('selectedGender') || 'reset';
  genderSortSelect.value = selectedGender;
}

export async function createHtml() {
  selectedGender = localStorage.getItem('selectedGender') || 'reset';

  const userData = await fetchRandomUsersData(selectedGender, currentPage);

  if (userData && userData.results && Array.isArray(userData.results)) {
    users.innerHTML = '';

    userData.results.forEach((user) => {
      const userFullName = `${user.name.first} ${user.name.last}`;
      const userMainLocation = `${user.location.city}, ${user.location.country}`;

      const userProfile = createUserProfile(user.gender);
      users.appendChild(userProfile);

      const userInfo = document.createElement('div');
      userInfo.setAttribute('class', 'userProfile__info');

      const userImage = createUserImage(user.picture.large, userFullName);
      userProfile.appendChild(userImage);

      const fullName = createUserName(userFullName, user.gender);
      userInfo.appendChild(fullName);

      const age = createUserAge(user.dob.age);
      userInfo.appendChild(age);

      const gender = createUserGender(user.gender);
      userInfo.appendChild(gender);

      const email = createUserEmail(user.email);
      userInfo.appendChild(email);

      const locations = createUserlocation(userMainLocation);
      userInfo.appendChild(locations);

      userProfile.appendChild(userInfo);

      const connectBtn = document.createElement('button');
      connectBtn.setAttribute('class', 'userProfile__btn');
      connectBtn.innerHTML = 'Connect';
      userProfile.appendChild(connectBtn);
    });

    const userProfiles = document.querySelectorAll('.userProfile');
    userProfiles.forEach((userProfile) => {
      const userProfileGender = userProfile.getAttribute('data-gender');
      if (selectedGender === 'reset') {
        userProfile.style.display = 'flex';
      } else if (selectedGender === 'male' || selectedGender === 'female') {
        if (userProfileGender === selectedGender) {
          userProfile.style.display = 'flex';
        } else {
          userProfile.style.display = 'none';
        }
      } else {
        userProfile.style.display = 'none';
      }
    });
  } else {
    console.error('Failed to fetch user data');
  }

  sortUsersByGender(selectedGender);
}

export function nextPage() {
  const buttonWrapper = document.querySelector('.pagePagination');
  const nextPageBtn = document.createElement('button');
  nextPageBtn.setAttribute('class', 'nextPageBtn');
  nextPageBtn.innerHTML = 'Next Page';
  buttonWrapper.appendChild(nextPageBtn);

  nextPageBtn.addEventListener('click', async () => {
    selectedGender = localStorage.getItem('selectedGender') || 'reset';
    const userData = await fetchRandomUsersData(selectedGender, currentPage);
    currentPage++;
    await createHtml();
    window.scrollTo(0, 0);
    sortUsersByGender(selectedGender);
  });
}
