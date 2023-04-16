import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Redux Basics</h1>
<div>
 store => <hr/>
 One store for entire application <hr/>
 Responsibilites <hr/>
       > Holds application  state <br>
        => Allows access to state via getState() method <br>
        => Allows state to be updated via dispatch(action) <br>
        => Register listners via subscribe(listner) <br>
        => Handles unregistering of listners via the function retured to subscript(listner) <br>
 <hr/>
Reducers <hr/>
Specifies how the app state changes in response to actions sent to the store
Reducers accept state & action as argument and returns the next state of the application
(previousState, action ) = newState
</div>
`;

import {
  bindActionCreators,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";

console.log("Redux");

// the initial state of application
const intialState = {
  noOfCakes: 10,
  noOfIceCream: 20,
};

// Action Names
const CAKE_ORDERED = "CAKE_ORDERED";
const RESTOCK_CAKE = "RESTOCK_CAKE";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const RESTOCK_ICECREAM = "RESTOCK_ICECREAM";

// Action creator
function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
}

function reStockCakes() {
  return {
    type: RESTOCK_CAKE,
  };
}

function orderIceCream() {
  return {
    type: ICECREAM_ORDERED,
    quantity: 1,
  };
}

function reStockIceCream() {
  return {
    type: RESTOCK_ICECREAM,
  };
}

//Reducers
// Specifies how the app state changes in response to actions sent to the store
// Reducers accept state & action as argument and returns the next state of the application
// (previousState, action ) = newState

const cakeReducer = (state = intialState, action) => {
  console.log(state, action.type);
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        noOfCakes: state.noOfCakes - 1,
      };
    case RESTOCK_CAKE:
      const restockQty = 10 - state.noOfCakes;
      return {
        ...state,
        noOfCakes: state.noOfCakes + restockQty,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = intialState, action) => {
  console.log(state, action.type);
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        noOfIceCream: state.noOfIceCream - 1,
      };
    case RESTOCK_ICECREAM:
      const restockQty = 20 - state.noOfIceCream;
      return {
        ...state,
        noOfIceCream: state.noOfIceCream + restockQty,
      };
    default:
      return state;
  }
};

// store =>
// One store for entire application
// Responsibilites
// => Holds application  state
// => Allows access to state via getState() method
// => Allows state to be updated via dispatch(action)
// => Register listners via subscribe(listner)
// => Handles unregistering of listners via the function retured to subscript(listner)

// To manage diffrent reducers of application
const rootReducer = {
  cake: cakeReducer,
  iceCream: iceCreamReducer,
};
const store = createStore(combineReducers(rootReducer));
console.log(store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("cake & icecream current quatity", store.getState())
);

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(reStockCakes());

// Alternative to dispatch method
const actions = bindActionCreators(
  { orderCake, reStockCakes, orderIceCream, reStockIceCream },
  store.dispatch
);
// For Cakes
// actions.orderCake();
// actions.orderCake();
// actions.orderCake();
// actions.reStockCakes();

// // For IceCream
actions.orderIceCream();
actions.orderIceCream();
actions.orderIceCream();
actions.reStockIceCream();

unsubscribe();
