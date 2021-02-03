/** @jsx jsx */
import { Dispatch } from "react";
import { jsx } from "@emotion/core";
// import FormGroup from "~components/form-group";
import { ActionType, schemaType} from "~components/interfaces";
import { renderFormGroup } from "~components/form-group"

// function renderFGO(fI: Array<string|Record<string, unknown>> | Record<string, unknown>, title: string, schema: schemaItem, key_:number, dispatcher: Dispatch<ActionType>){
//   return <FormGroup formItems={fI} title={title} schema={schema} key={key_} dispatcher={dispatcher}></FormGroup>
// }

interface RecipeComponentProps {
  body: Record<string, unknown>|null
  schema: schemaType
  isLoading: boolean
  dispatcher: Dispatch<ActionType>
}

function RecipeComponent(props: RecipeComponentProps): JSX.Element|JSX.Element[]{
  const { body, isLoading, schema, dispatcher } = props;

  if (schema === null){
    return <h3> No schema loaded... </h3>
  } else if (isLoading){
    return <h3> LOADING... </h3>
  } else if (body === undefined){
    return <h3> No bodayyyyy</h3>
  } else {
    return (
        Object.entries(body).map( (k: ArrayLike<Record<string, unknown>>) => {
          return renderFormGroup(k[1], k[0], schema.properties[k[0]], k[0], dispatcher)
        })
    )
  }
}

export default RecipeComponent;

