// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module help-extension
 */

import {

  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import {
  Dialog,
  ICommandPalette,
  showDialog,
} from '@jupyterlab/apputils';

import { ITranslator } from '@jupyterlab/translation';
import {
  jupyterIcon,
  jupyterlabWordmarkIcon,
} from '@jupyterlab/ui-components';

import * as React from 'react';

/**
 * The command IDs used by the help plugin.
 */
namespace CommandIDs {

  export const about = 'help:about';

  
}

const about: JupyterFrontEndPlugin<void> = {
  id: 'about',
  autoStart: true,
  requires: [ITranslator],
  optional: [ICommandPalette],
  activate: (
    app: JupyterFrontEnd,
    translator: ITranslator,
    palette: ICommandPalette | null
  ): void => {
    const { commands } = app;
    const trans = translator.load('jupyterlab');
    const category = trans.__('Help');
    commands.addCommand(CommandIDs.about, {
      label: trans.__('About'),
      execute: () => {
        // Create the header of the about dialog
        const versionNumber = trans.__('Version %1', app.version);
        const versionInfo = (
          <span className="jp-About-version-info">
            <span className="jp-About-version">{versionNumber}</span>
          </span>
        );
        const title = (
          <span className="jp-About-header">
            <jupyterIcon.react margin="7px 9.5px" height="auto" width="58px" />
            <div className="jp-About-header-info">
              <jupyterlabWordmarkIcon.react height="auto" width="196px" />
              {versionInfo}
            </div>
          </span>
        );

        // Create the body of the about dialog
        const jupyterURL = 'https://jupyter.org/about.html';
        const contributorsURL =
          'https://github.com/jupyterlab/jupyterlab/graphs/contributors';
        const externalLinks = (
          <span className="jp-About-externalLinks">
            <a
              href={contributorsURL}
              target="_blank"
              rel="noopener noreferrer"
              className="jp-Button-flat"
            >
              {trans.__('CONTRIBUTOR LIST')}
            </a>
            <a
              href={jupyterURL}
              target="_blank"
              rel="noopener noreferrer"
              className="jp-Button-flat"
            >
              {trans.__('ABOUT PROJECT JUPYTER')}
            </a>
          </span>
        );
        const copyright = (
          <span className="jp-About-copyright">
            {trans.__('© 2015-2021 Project Jupyter Contributors')}
          </span>
        );
        const body = (
          <div className="jp-About-body">
            {externalLinks}
            {copyright}
          </div>
        );

        return showDialog({
          title,
          body,
          buttons: [
            Dialog.createButton({
              label: trans.__('Dismiss'),
              className: 'jp-About-button jp-mod-reject jp-mod-styled'
            })
          ]
        });
      }
    });

    if (palette) {
      palette.addItem({ command: CommandIDs.about, category });
    }
  }
};



const plugins: JupyterFrontEndPlugin<any>[] = [
  about
];

export default plugins;
