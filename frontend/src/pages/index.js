
import Recipes from "@/src/pages/recipes";
import {Provider} from "react-redux";
import {store} from "@/src/store/store";

const App = () => {
    return (
        <Provider store={store} >
            <Recipes />
        </Provider>
        )
}

export default App
