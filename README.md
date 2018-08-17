## My Special Web Part

This is a sample SPFx web part used in conjunction with my Getting Started with the SharePoint Framework (SPFx) talk. You can find the relevant slides (with some instructions in the notes) here: https://thechriskent.com/2018/08/17/thank-you-sps-charlotte-2/

### Building the code

You can either clone it with fancy git commands, or just use the download zip button in the top-right. Once you do, from a command line in the directory fun these commands (This will require you to have NodeJS and gulp installed which you would if you were doing SPFx development).

```bash
npm install
gulp serve
```

> This will show the webpart in the local workbench (which will only pull mock lists). You'll need to go to an actual tenant site and append `_layouts/15/workbench.aspx` to get to the online workbench.

### Other Stuff

Feel free to use or adapt this web part for whatever. It's really not a production ready app is only designed to illustrate a few key things:

- Importing external libraries
  - [PnPJS](https://pnp.github.io/pnpjs/)
  - [PnP Property Controls](https://sharepoint.github.io/sp-dev-fx-property-controls/)
  - [PnP React Controls](https://sharepoint.github.io/sp-dev-fx-controls-react/)
- Passing properties to your component(s)
- Setting an icon
- Pulling together other people's work (PnP) to accelarate your own
