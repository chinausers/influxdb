// Libraries
import React, {PureComponent, ChangeEvent} from 'react'

// Styles
import 'src/organizations/components/CreateVariableOverlay.scss'

// Components
import {
  Form,
  OverlayBody,
  OverlayHeading,
  OverlayContainer,
  Input,
  Button,
  ComponentColor,
  ComponentStatus,
  ButtonType,
  OverlayFooter,
} from 'src/clockface'
import FluxEditor from 'src/shared/components/FluxEditor'

interface Props {
  onCreateVariable: () => void
  onCloseModal: () => void
}

interface State {
  name: string
  script: string
  nameInputStatus: ComponentStatus
  errorMessage: string
}

export default class CreateOrgOverlay extends PureComponent<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      script: '',
      nameInputStatus: ComponentStatus.Default,
      errorMessage: '',
    }
  }

  public render() {
    const {onCloseModal} = this.props
    const {nameInputStatus, name, script} = this.state

    return (
      <OverlayContainer maxWidth={1000}>
        <OverlayHeading
          title="Create Variable"
          onDismiss={this.props.onCloseModal}
        />

        <Form>
          <OverlayBody>
            <div className="overlay-flux-editor--spacing">
              <Form.Element label="Name">
                <Input
                  placeholder="Give your variable a name"
                  name="name"
                  autoFocus={true}
                  value={name}
                  onChange={this.handleChangeInput}
                  status={nameInputStatus}
                />
              </Form.Element>
            </div>

            <Form.Element label="Value">
              <div className="overlay-flux-editor">
                <FluxEditor
                  script={script}
                  onChangeScript={this.handleChangeScript}
                  visibility="visible"
                  status={{text: '', type: ''}}
                  suggestions={[]}
                />
              </div>
            </Form.Element>

            <OverlayFooter>
              <Button
                text="Cancel"
                color={ComponentColor.Danger}
                onClick={onCloseModal}
              />
              <Button
                text="Create"
                type={ButtonType.Submit}
                onClick={this.handleCreateVariable}
                color={ComponentColor.Primary}
              />
            </OverlayFooter>
          </OverlayBody>
        </Form>
      </OverlayContainer>
    )
  }

  private handleCreateVariable = () => {
    const {onCloseModal} = this.props
    onCloseModal()
  }

  private handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const key = e.target.name

    const newState = {...this.state}
    newState[key] = value
    this.setState(newState)
  }

  private handleChangeScript = (script: string): void => {
    this.setState({script})
  }
}
