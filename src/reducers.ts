export enum Types {
  Create = "CREATE_PRODUCT",
  Delete = "DELETE_PRODUCT",
  Add = "ADD_PRODUCT",
}

// Product

type ProductType = {
  id: number;
  name: string;
  price: number;
};

export type ProductActions =
  | {
      type: Types.Create;
      payload: {
        id: number;
        name: string;
        price: number;
      };
    }
  | {
      type: Types.Delete;
      payload: {
        id: number;
      };
    };

export const productReducer = (state: ProductType[], action: ProductActions | ShoppingCartActions) => {
  switch (action.type) {
    case Types.Create:
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
        },
      ];
    case Types.Delete:
      return [...state.filter((product) => product.id !== action.payload.id)];
    default:
      return state;
  }
};

// ShoppingCart
export type ShoppingCartActions = {
  type: Types.Add;
};

export const shoppingCartReducer = (state: number, action: ProductActions | ShoppingCartActions) => {
  switch (action.type) {
    case Types.Add:
      return state + 1;
    default:
      return state;
  }
};
