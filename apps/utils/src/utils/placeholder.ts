export const replacePlaceholders = (
  inputString: string,
  replacements: Record<string, unknown>
): string => {
  const regex = /{{(.*?)}}/g;

  const replacedString = inputString.replace(regex, (match, placeholder) => {
    const trimmedPlaceholder = placeholder.trim();
    return replacements[trimmedPlaceholder] !== undefined
      ? String(replacements[trimmedPlaceholder])
      : match;
  });

  return replacedString;
};
