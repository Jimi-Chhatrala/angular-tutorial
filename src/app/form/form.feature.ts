import { createFeature } from "@ngrx/store";
import { reducer } from "./form.reducer";

export const formFeature = createFeature({
  name: 'form',
  reducer
})
