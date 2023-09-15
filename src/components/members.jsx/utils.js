export function customSort(arr) {
  arr.sort((a, b) => {
    // Priority 1: is an admin
    if (b.admin - a.admin !== 0) {
      return b.admin - a.admin;
    }

    // Priority 2: is a bureau
    if (b.bureau - a.bureau !== 0) {
      return b.bureau - a.bureau;
    }

    // Priority 3: is a subAdmin
    if (b.subAdmin - a.subAdmin !== 0) {
      return b.subAdmin - a.subAdmin;
    }

    // Priority 4: year (assuming year is a numeric property)
    if (b.year - a.year !== 0) {
      return b.year - a.year;
    }

    // Priority 5: displayName (string comparison)
    const displayNameComparison = b.displayName.localeCompare(a.displayName);
    if (displayNameComparison !== 0) {
      return displayNameComparison;
    }

    // Priority 6: uid (string comparison)
    return b.uid.localeCompare(a.uid);
  });

  return arr;
}
