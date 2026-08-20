function capitalise(string) {
    const lowerCaseString = string.toLowerCase();
    const lowerCaseStringWords = lowerCaseString.split(" ");

    const capitalisedStringWords = lowerCaseStringWords.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

    const capitalisedString = capitalisedStringWords.join(" ");

    return capitalisedString;
}
