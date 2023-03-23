If there is not a path already in the URL (e.g. /butter), you start by searching, which eventually leads to a path being added to the URL

If using search:
- results are fetched from Algolia based on search term
- selecting a result redirects to '/result', 

Once there is a path in the URL:
- the <Root> component gets the path via useParams
- the path is used as the database query
- query results are stored in currentItem
- the categorizeSubstitutes function handles separating the subsitutes by category, which are stored in substitutesByCategory
- the <Substitutes> component is rendered (via an <Outlet>), and is given both currentItem, substitutesByCategory


{
    autocompleteState.query ? 
    x
    : null
}