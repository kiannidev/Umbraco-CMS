import { manifest as schemaManifest } from './Umbraco.ElementPicker.js';
import { UMB_PICKER_DATA_SOURCE_TYPE } from '@umbraco-cms/backoffice/picker-data-source';
import type { ManifestPropertyEditorDataSource } from '@umbraco-cms/backoffice/property-editor-data-source';
import type { ManifestPropertyEditorUi } from '@umbraco-cms/backoffice/property-editor';

// TODO: [LK] Remove `dataSources` in due course.
// Currently we need at least one `propertyEditorDataSource` extension registered,
// otherwise "property-editors\entity-data-picker\entry-point.ts" does not register the required manifests.
const dataSources: Array<ManifestPropertyEditorDataSource> = [
	{
		type: 'propertyEditorDataSource',
		alias: 'Umb.PropertyEditorDataSource.ElementFolder',
		dataSourceType: UMB_PICKER_DATA_SOURCE_TYPE,
		name: 'Element Folder Property Data Source',
		api: () => import('./element-folder-tree-data-source.js'),
		meta: {
			label: 'Element Folders',
			description: 'Umbraco Element Folders data source for property editors.',
			icon: 'icon-folder',
		},
	},
];

const propertyEditorUi: ManifestPropertyEditorUi = {
	type: 'propertyEditorUi',
	alias: 'Umb.PropertyEditorUi.ElementPicker',
	name: 'Element Picker Property Editor UI',
	element: () => import('./element-picker-property-editor-ui.element.js'),
	meta: {
		label: schemaManifest.name,
		propertyEditorSchemaAlias: schemaManifest.alias,
		icon: 'icon-plugin',
		group: 'pickers',
		supportsReadOnly: true,
		settings: {
			properties: [
				{
					alias: 'validationLimit',
					label: 'Amount',
					propertyEditorUiAlias: 'Umb.PropertyEditorUi.NumberRange',
					config: [{ alias: 'validationRange', value: { min: 0, max: Infinity } }],
					weight: 100,
				},
			],
		},
	},
};

export const manifests: Array<UmbExtensionManifest> = [...dataSources, propertyEditorUi, schemaManifest];
