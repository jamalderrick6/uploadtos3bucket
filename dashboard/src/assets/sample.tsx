import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, CommandColumn, Toolbar } from '@syncfusion/ej2-react-grids';

export class CommandColumnEdit extends React.Component {
    constructor(props) {
        super(props);
        this.toolbarOptions = ['Add'];
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, allowEditOnDblClick: false };
        this.editparams = { params: { popupHeight: '300px' } };
        this.validationRule = { required: true };
        this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
        { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
        { buttonOption: { content: 'Alter', cssClass: 'e-flat e-alter', id: 'alter' } },
        { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
        { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];
    }
    commandClick(args) {
        if (this.grid && args.commandColumn.buttonOption.id == "alter") {
            var newData = args.rowData; // here you can get the row data by args.rowData
            console.log("row data", newData)
        }
    }
    actionComplete(args) {
        if (args.requestType == 'cancel' || args.requestType == 'save') {
            debugger;
            this.grid.element.classList.remove('g-added')
        }
    }
    actionBegin(args) {
        debugger;
        if (args.requestType == 'beginEdit' || args.requestType == 'add') {
            debugger;
            this.grid.element.classList.add('g-added')
        }
    }
    render() {
        const { dataset, type } = this.props;
        this.commandClick = this.commandClick.bind(this);
        return (<div className='control-pane'>
            <div className='control-section'>
                <GridComponent id='gridcomp' dataSource={dataset} toolbar={this.toolbarOptions} allowPaging={true} pageSettings={{ pageCount: 5 }} editSettings={this.editSettings} commandClick={this.commandClick}
                    actionBegin={this.actionBegin.bind(this)} actionComplete={this.actionComplete.bind(this)} ref={g => this.grid = g}>
                    <ColumnsDirective>
                        <ColumnDirective field="value" headerText="VALUE" minWidth='50' width='140' maxWidth='200' textAlign="center" />
                        <ColumnDirective field="avg" headerText="AVG" minWidth='50' width='140' maxWidth='200' textAlign="center" />
                        <ColumnDirective field="stdv" headerText="STDV" minWidth='50' width='120' maxWidth='200' textAlign="center" />
                        <ColumnDirective field="low" headerText="LOW" minWidth='50' width='120' maxWidth='200' textAlign="center" />

                        {/* <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' isPrimaryKey={true} validationRules={this.validationRule}></ColumnDirective>
                        <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={this.validationRule}></ColumnDirective>
                        <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' editType='numericedit'></ColumnDirective>
                        <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit' edit={this.editparams}></ColumnDirective> */}
                        <ColumnDirective headerText='Manage Records' width='160' commands={this.commands}></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[Page, CommandColumn, Edit, Toolbar]} />
                </GridComponent>
            </div>
        </div>);
    }
}

export default CommandColumnEdit