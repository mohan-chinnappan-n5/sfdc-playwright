instanceUrl="https://dhs000000qasyma4-dev-ed.develop.my.salesforce.com"
accessToken="00DHs000000QASY!AQwAQB4obQbsIcKM__6svU9WBaTPl7mLKdBoeu3ukLJBym0EjkZvnmpbBlXtgWu.g0BZoVFk.HAHsLkGlH3yaOPMm9CxqVZ1"

frontdoorUrl="${instanceUrl}/secur/frontdoor.jsp?sid=${accessToken}"
echo "frontdoor url:    $frontdoorUrl"
npx playwright codegen "$frontdoorUrl"
