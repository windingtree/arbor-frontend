export function addOrganization(orgId) {
    return { type: "ADD_ORGANIZATION", payload: {orgId} }
}
export async function scrapeOrganizations(organizations) {
    const fetchedOrgs = await fetch("localhost:/api/v1/orgids");
    return { type: "SCRAPE_ORGANIZATIONS",  fetchedOrgs}
}