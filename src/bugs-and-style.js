// Utility functions with bugs and style issues

// STYLE ISSUE: No JSDoc comment for exported function
// BUG: Missing error handling for division by zero
function calculateAverage(numbers) {
  var total = 0; // STYLE ISSUE: using var instead of const/let

  for (var i = 0; i < numbers.length; i++) {
    // STYLE ISSUE: poor spacing and var usage
    total += numbers[i]; // STYLE ISSUE: no spaces around operators
  }

  return total / numbers.length; // BUG: division by zero if array is empty
}

// BUG: Function doesn't handle null/undefined input
// STYLE ISSUE: Inconsistent naming (snake_case vs camelCase)
function format_user_name(firstName, lastName) {
  // STYLE ISSUE: no spaces after commas
  return firstName + " " + lastName; // STYLE ISSUE: string concatenation instead of template literals
}

// BUG: Potential null reference error
// STYLE ISSUE: No input validation
function getUserEmail(user) {
  return user.profile.email.toLowerCase(); // BUG: crashes if profile or email is null/undefined
}

// BUG: Memory leak - event listener never removed
// STYLE ISSUE: Mixing callback and promise patterns
function setupEventHandler(element, callback) {
  element.addEventListener("click", function (event) {
    // STYLE ISSUE: anonymous function instead of named
    // BUG: No error handling for callback
    callback(event);
  });
}

// STYLE ISSUE: Function too long (violates team rule)
// BUG: Modifies input array unexpectedly
function processUserData(users) {
  for (let user of users) {
    if (!user.id) {
      user.id = Math.random().toString(36); // BUG: modifies input array
    }

    if (user.email) {
      user.email = user.email.toLowerCase();
      user.emailValid = validateEmail(user.email);
    }

    if (user.phone) {
      user.phone = formatPhoneNumber(user.phone);
      user.phoneValid = validatePhone(user.phone);
    }

    if (user.address) {
      user.address.formatted = formatAddress(user.address);
      user.address.coordinates = geocodeAddress(user.address);
    }

    if (user.birthDate) {
      user.age = calculateAge(user.birthDate);
      user.isAdult = user.age >= 18;
      user.ageGroup = getAgeGroup(user.age);
    }

    user.createdAt = new Date();
    user.updatedAt = new Date();

    if (user.preferences) {
      user.preferences.theme = user.preferences.theme || "light";
      user.preferences.language = user.preferences.language || "en";
      user.preferences.timezone = user.preferences.timezone || "UTC";
      user.preferences.notifications = user.preferences.notifications || {};
      user.preferences.notifications.email =
        user.preferences.notifications.email !== false;
      user.preferences.notifications.sms =
        user.preferences.notifications.sms === true;
      user.preferences.notifications.push =
        user.preferences.notifications.push !== false;
    }

    // Calculate user score based on various factors
    let score = 0;
    score += user.emailValid ? 10 : 0;
    score += user.phoneValid ? 10 : 0;
    score += user.address ? 15 : 0;
    score += user.isAdult ? 5 : 0;
    user.score = score;
  }

  return users; // BUG: returns modified input array
}

// BUG: Async function not properly awaited
async function saveUser(userData) {
  validateUserData(userData); // BUG: not awaited, might be async
  return database.save(userData); // BUG: not awaited
}

// BUG: Callback hell instead of promises/async-await
// STYLE ISSUE: Deeply nested callbacks
function loadUserWithDetails(userId, callback) {
  database.findUser(userId, function (err, user) {
    if (err) return callback(err);

    database.findUserPosts(userId, function (err, posts) {
      if (err) return callback(err);

      database.findUserFollowers(userId, function (err, followers) {
        if (err) return callback(err);

        database.findUserFollowing(userId, function (err, following) {
          if (err) return callback(err);

          callback(null, {
            ...user,
            posts,
            followers,
            following,
          });
        });
      });
    });
  });
}

// Helper functions (not implemented - would cause reference errors)
function validateEmail(email) {
  return true;
}
function validatePhone(phone) {
  return true;
}
function formatPhoneNumber(phone) {
  return phone;
}
function formatAddress(address) {
  return "";
}
function geocodeAddress(address) {
  return null;
}
function calculateAge(birthDate) {
  return 25;
}
function getAgeGroup(age) {
  return "adult";
}
function validateUserData(userData) {
  return true;
}

module.exports = {
  calculateAverage,
  format_user_name,
  getUserEmail,
  setupEventHandler,
  processUserData,
  saveUser,
  loadUserWithDetails,
};
