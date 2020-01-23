const initialState = {
    organizations: []
};

function home(state = initialState, action) {
    switch (action.type) {
        case 'ADD_ORGANIZATION':
            return {
                ...state,
                organizations: [...state.organizations, action.orgid]
            };
        case "SCRAPE_ORGANIZATIONS":
            console.log('SCRAPE_ORGANIZATIONS');
            return {
                ...state,

            };
        default:
            return state
    }
}

export default home;