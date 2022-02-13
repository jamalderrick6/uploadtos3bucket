import React, { Component } from 'react';
import { GridComponent, ColumnDirective, CommandColumn, ColumnsDirective, Page } from '@syncfusion/ej2-react-grids'
import { L10n } from '@syncfusion/ej2-base';
import { Inject } from '@syncfusion/ej2-react-grids';
import { getValue } from '@syncfusion/ej2-base'
import { downloadRun, getUploadRuns, postForUpload } from '../utils/Api';

L10n.load({
    'en-US': {
        'pager': {
            'currentPageInfo': '',
            'totalItemsInfo': '{1} to {2} of {0} results',
        }
    }
});

interface myProps {
    dataset: [],
    type: string
}


export default class GridApp extends Component<myProps, {}> {
    constructor(props: any) {
        super(props);
        this.commands = [
            {
                buttonOption: {
                    content: 'Upload', cssClass: 'e-flat'
                }
            }
        ];
        this.state = {
            runs: [],
        }
    }

    getRunsUpload = async () => {
        const data = await getUploadRuns()
        if ([200, 201].includes(data.response.status)) {
            this.setState({
                runs: data.json
            })
        }
    }

    async componentDidMount() {
        await this.getRunsUpload()
    }


    queryCellInfoEvent = (args: any) => {
        if (args.column.field === "ok") {
            if (getValue('ok', args.data) === true) {
                args.cell.classList.add('safe-green');
            }
            else if (getValue('ok', args.data) === false) {
                args.cell.classList.add('danger-red');
            }
        }
    }

    commandClick(args: any) {
        if (this.grid) {
            this.downloadRunResults(args.rowData.id, args.rowData.started_at)
        }
    }

    downloadRunResults = async (field: string, started_at: string) => {
        const data = await downloadRun(field);
        if ([200, 201].includes(data.response.status)) {
            console.log("json for run download", data.json);
            let url = data.json["s3"];

            let payload = {
                "crawler": this.props.crawler,
                "run_started_at": started_at,
                "run_url": url
            }

            const uploaddata = await postForUpload(field, payload);
            if ([200, 201].includes(uploaddata.response.status)) {
                console.log(uploaddata.json)
            } else {
                console.log("error", uploaddata)
            }
        } else {
            console.log(data.response);
            console.log(data.json);
        }
    };


    render() {
        const { dataset, type } = this.props;
        this.commandClick = this.commandClick.bind(this);
        console.log("runs", this.state.runs)
        return (
            <GridComponent dataSource={dataset}
                allowPaging={true}
                pageSettings={{ pageSize: 50 }}
                height={325}
                commandClick={this.commandClick}
                queryCellInfo={this.queryCellInfoEvent}
                ref={g => this.grid = g}
            >
                {
                    type === "comparables" ? (
                        <ColumnsDirective>
                            <ColumnDirective field="attribute" headerText="ATTRIBUTE" textAlign="center" backgroundColor="#eef0fd" />
                            <ColumnDirective field="value" headerText="VALUE" minWidth='50' width='140' maxWidth='200' textAlign="center" />
                            <ColumnDirective field="avg" headerText="AVG" minWidth='50' width='140' maxWidth='200' textAlign="center" />
                            <ColumnDirective field="stdv" headerText="STDV" minWidth='50' width='120' maxWidth='200' textAlign="center" />
                            <ColumnDirective field="low" headerText="LOW" minWidth='50' width='120' maxWidth='200' textAlign="center" />
                            <ColumnDirective field="high" headerText="HIGH" minWidth='50' width='120' maxWidth='200' textAlign="center" />
                            <ColumnDirective field="ok" headerText="OK" minWidth='50' width='100' maxWidth='120' textAlign="center" />
                        </ColumnsDirective>
                    ) : (
                        <ColumnsDirective>
                            <ColumnDirective field="id" headerText="RUN ID" textAlign="center" backgroundColor="#eef0fd" />
                            <ColumnDirective field="started_at" headerText="STARTED AT" minWidth='50' width='140' maxWidth='200' textAlign="center" />
                            <ColumnDirective field="ended_at" headerText="ENDED AT" minWidth='50' width='140' maxWidth='200' textAlign="center" />
                            <ColumnDirective field="duration" headerText="DURATION" minWidth='50' width='120' maxWidth='200' textAlign="center" />
                            <ColumnDirective field="status" headerText="STATUS" minWidth='50' width='120' maxWidth='200' textAlign="center" />
                            <ColumnDirective field="done_reason" headerText="DONE REASON" minWidth='50' width='120' maxWidth='200' textAlign="center" />
                            <ColumnDirective headerText='Upload' width='160' commands={this.commands}></ColumnDirective>
                        </ColumnsDirective>

                    )
                }
                <Inject services={[Page, CommandColumn]} />
            </GridComponent>
        )
    }
}
