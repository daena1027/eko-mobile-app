export function emailValidator(email) {
  const re = /^([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])$/; 
  if (!email) return "Please fill in this field."
  if (!re.test(email)) return 'Please enter a valid email address!'
  return ''
}