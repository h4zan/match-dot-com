export async function fetchRandomUsersData() {
  try {
    const response = await fetch(
      'https://randomuser.me/api/?exc=login&results=20'
    );
    const randomUserData = await response.json();
    console.log(randomUserData);
    return randomUserData;
  } catch (error) {
    console.error(`Download error: ${error.message}`);
    return null;
  }
}
