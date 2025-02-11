'use client';
import ReportViewer, { Callbacks, DxReportViewerRef, RequestOptions } from 'devexpress-reporting-react/dx-report-viewer';

function App() {
  const onBeforeRender = ({ args }): void => {
    args.reportPreview.zoom = 0.25;
    args.reportPreview.showMultipagePreview = true;
    console.log("Page load starts...");
    //Subscribe to property change. 
    args.reportPreview.events.on('propertyChanged', (e) => {
      if (e.propertyName === 'pages') {
        const newValue = e.newValue;
        if (newValue.length > 0) {
          console.log("A page is loaded. Pages.count: " + newValue.length);
        }
      }
    });
  }

  return (
    <>
      <ReportViewer reportUrl="TestExportReport">
        <RequestOptions host="http://localhost:5000/" invokeAction="/DXXRDV" />
        <Callbacks BeforeRender={onBeforeRender} />
      </ReportViewer>
    </>
  )
}

export default App