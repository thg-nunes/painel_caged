import Multiselect from "multiselect-react-dropdown"
import { useContext } from "react"
import { ContextGlobal } from "../../contexts/context"

type DataToFilter = {
  descriptionFilter: string
  placeholder: string
  options: any[]
  actionType: string
  otherClassNameToSectionTag: string
  otherClassNameToMultiselectComponent: string
  showCheckbox: boolean
  singleSelect: boolean
  selectionLimit?: number
}

export const Filter = ({ descriptionFilter, options, actionType, showCheckbox = true, singleSelect = false, placeholder = 'Selecionar',
  otherClassNameToSectionTag = '', otherClassNameToMultiselectComponent = '', selectionLimit
}: DataToFilter) => {
  const context = useContext(ContextGlobal)
  
  return (
    <section className={`${otherClassNameToSectionTag !== '' ? otherClassNameToSectionTag : null} container-filter`}>
      <p>{descriptionFilter}</p>
      <Multiselect
        className={`${otherClassNameToMultiselectComponent !== '' ? otherClassNameToMultiselectComponent : null} filter`}
        displayValue='label'
        onRemove={(e) => context.dispatch({type: actionType, payload: e})}
        onSelect={(e) => context.dispatch({type: actionType, payload: e})}
        placeholder={placeholder}
        showCheckbox={showCheckbox}
        singleSelect={singleSelect}
        options={options}
        selectionLimit={selectionLimit}
      />
    </section>
  )
}