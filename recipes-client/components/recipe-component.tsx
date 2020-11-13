/** @jsx jsx */
import { useEffect, Dispatch } from "react";
import { useImmerReducer } from "use-immer";
import { jsx } from "@emotion/core";
import FormGroup from "~components/form-group";
import { recipeReducer, defaultState } from "~reducers/recipe-reducer";
import { actions } from "~actions/recipeActions";
import { ActionType, schemaItem, schemaType} from "~components/interfaces";
import {apiURL, schemaEndpoint} from "~consts/index";

function renderFGO(fI: Array<string|Record<string, unknown>> | Record<string, unknown>, title: string, schema: schemaItem, key_:number, dispatcher: Dispatch<ActionType>){
  return <FormGroup formItems={fI} title={title} schema={schema} key={key_} dispatcher={dispatcher}></FormGroup>
}

interface RecipeComponentProps2 {
  articleId: string
}

interface RecipeComponentProps {
  title: string
  body: Record<string, unknown>|null
  schema: schemaType
  isLoading: boolean
}

function RecipeComponent(props: RecipeComponentProps2): JSX.Element|JSX.Element[]{
  const [state, dispatch] = useImmerReducer(recipeReducer, defaultState);
  const { body, isLoading, schema } = state;
  const {articleId} = props;

  useEffect((aId: string) => {
    fetch(`${location.origin}${apiURL}${schemaEndpoint}`)
    .then((response) => {return response.json<{ data: Record<string,unknown>}>()})
    .then((data: Record<string,unknown>) => dispatch({"type": actions.init, "payload": {schema: data}}))
    .catch(() => dispatch({"type": actions.error, "payload": "Error fetching schema data."}) );
    fetch(`${location.origin}${apiURL}${aId}`)
    .then((response) => {return response.json<{ data: Record<string,unknown>}>()})
    .then((data: Record<string,unknown>) => dispatch({"type": actions.init, "payload": {isLoading: false, body: data}}))
    .catch(() => dispatch({"type": actions.error, "payload": "Error fetching body data."}) );
  }, [articleId]);


  if (schema === null){
    return <h3> No schema loaded... </h3>
  } else if (isLoading){
    return <h3> LOADING... </h3>
  } else if (body === undefined){
    return <h3> No bodayyyyy</h3>
  } else {
    return (
        Object.entries(body).map( (k: ArrayLike<Record<string, unknown>>, i:int) => {
          return renderFGO(k[1], k[0], schema.properties[k[0]], i, dispatch)
        })
    )
  }
}

export default RecipeComponent;

