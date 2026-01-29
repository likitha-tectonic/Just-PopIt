import { GoogleSpreadsheet } from 'google-spreadsheet';
import { v4 as uuidv4 } from 'uuid';

/**
 * Google Sheets Service for Just PopIt
 * Handles all interactions with Google Sheets as the database
 */

interface GoogleSheetsConfig {
  clientEmail: string;
  privateKey: string;
}

export class GoogleSheetsService {
  private doc: GoogleSpreadsheet | null = null;
  private config: GoogleSheetsConfig;

  constructor(config: GoogleSheetsConfig) {
    this.config = config;
  }

  /**
   * Initialize connection to Google Sheets
   */
  async connect(spreadsheetId: string) {
    try {
      this.doc = new GoogleSpreadsheet(spreadsheetId);
      
      await this.doc.useServiceAccountAuth({
        client_email: this.config.clientEmail,
        private_key: this.config.privateKey.replace(/\\n/g, '\n'),
      });

      await this.doc.loadInfo();
      console.log(`Connected to Google Sheet: ${this.doc.title}`);
      return true;
    } catch (error) {
      console.error('Failed to connect to Google Sheets:', error);
      throw error;
    }
  }

  /**
   * Create a new spreadsheet with the Just PopIt template structure
   */
  async createSpreadsheet(merchantId: string): Promise<string> {
    try {
      // Create new spreadsheet
      const doc = await GoogleSpreadsheet.createNewSpreadsheetDocument({
        client_email: this.config.clientEmail,
        private_key: this.config.privateKey.replace(/\\n/g, '\n'),
      }, {
        title: `Just PopIt - ${merchantId}`,
      });

      this.doc = doc;
      await this.doc.loadInfo();

      // Create the 6 required sheets
      await this.createPopupsSheet();
      await this.createDisplayTriggersSheet();
      await this.createDismissalTriggersSheet();
      await this.createExperimentsSheet();
      await this.createAnalyticsSheet();
      await this.createTemplatesSheet();

      // Delete the default "Sheet1" if it exists
      const defaultSheet = this.doc.sheetsByIndex[0];
      if (defaultSheet && defaultSheet.title === 'Sheet1') {
        await defaultSheet.delete();
      }

      console.log(`Created new spreadsheet: ${this.doc.spreadsheetId}`);
      return this.doc.spreadsheetId;
    } catch (error) {
      console.error('Failed to create spreadsheet:', error);
      throw error;
    }
  }

  /**
   * Create Popups sheet with proper schema
   */
  private async createPopupsSheet() {
    if (!this.doc) throw new Error('Not connected to spreadsheet');

    const sheet = await this.doc.addSheet({
      title: 'Popups',
      headerValues: [
        'popup_id',
        'name',
        'status',
        'type',
        'template_id',
        'content_json',
        'style_json',
        'placement',
        'overlay_settings_json',
        'z_index',
        'animations_json',
        'preview_enabled',
        'preview_settings_json',
        'created_at',
        'updated_at',
        'created_by',
      ],
    });

    console.log('Created Popups sheet');
    return sheet;
  }

  /**
   * Create DisplayTriggers sheet
   */
  private async createDisplayTriggersSheet() {
    if (!this.doc) throw new Error('Not connected to spreadsheet');

    const sheet = await this.doc.addSheet({
      title: 'DisplayTriggers',
      headerValues: [
        'trigger_id',
        'popup_id',
        'trigger_group_id',
        'group_logic',
        'trigger_category',
        'trigger_type',
        'operator',
        'value',
        'secondary_value',
        'enabled',
        'created_at',
      ],
    });

    console.log('Created DisplayTriggers sheet');
    return sheet;
  }

  /**
   * Create DismissalTriggers sheet
   */
  private async createDismissalTriggersSheet() {
    if (!this.doc) throw new Error('Not connected to spreadsheet');

    const sheet = await this.doc.addSheet({
      title: 'DismissalTriggers',
      headerValues: [
        'dismissal_id',
        'popup_id',
        'trigger_type',
        'trigger_subtype',
        'value',
        'dismissal_type',
        'temporary_settings_json',
        'enabled',
        'created_at',
      ],
    });

    console.log('Created DismissalTriggers sheet');
    return sheet;
  }

  /**
   * Create Experiments sheet
   */
  private async createExperimentsSheet() {
    if (!this.doc) throw new Error('Not connected to spreadsheet');

    const sheet = await this.doc.addSheet({
      title: 'Experiments',
      headerValues: [
        'experiment_id',
        'popup_id',
        'name',
        'status',
        'start_date',
        'end_date',
        'variants_json',
        'success_metric',
        'goal_action',
        'winner_variant_id',
        'confidence_level',
        'created_at',
        'completed_at',
      ],
    });

    console.log('Created Experiments sheet');
    return sheet;
  }

  /**
   * Create Analytics sheet
   */
  private async createAnalyticsSheet() {
    if (!this.doc) throw new Error('Not connected to spreadsheet');

    const sheet = await this.doc.addSheet({
      title: 'Analytics',
      headerValues: [
        'event_id',
        'popup_id',
        'experiment_id',
        'variant_id',
        'event_type',
        'user_id',
        'session_id',
        'page_url',
        'page_type',
        'device_type',
        'browser',
        'traffic_source',
        'utm_source',
        'utm_campaign',
        'timestamp',
        'additional_data_json',
      ],
    });

    console.log('Created Analytics sheet');
    return sheet;
  }

  /**
   * Create Templates sheet
   */
  private async createTemplatesSheet() {
    if (!this.doc) throw new Error('Not connected to spreadsheet');

    const sheet = await this.doc.addSheet({
      title: 'Templates',
      headerValues: [
        'template_id',
        'name',
        'description',
        'category',
        'layout_type',
        'preview_image_url',
        'content_json',
        'style_json',
        'default_triggers_json',
        'default_dismissals_json',
        'is_system_template',
        'created_at',
      ],
    });

    // Add default templates
    await this.addDefaultTemplates(sheet);

    console.log('Created Templates sheet');
    return sheet;
  }

  /**
   * Add default system templates
   */
  private async addDefaultTemplates(sheet: any) {
    const templates = [
      {
        template_id: 'banner_template',
        name: 'Banner Display Pop-up',
        description: 'Full-width promotional banner for announcements and free shipping alerts',
        category: 'promotion',
        layout_type: 'banner',
        preview_image_url: '',
        content_json: JSON.stringify({
          text: 'Free Shipping on Orders Over $75!',
          cta_text: 'Shop Now',
          cta_link: '/collections/all',
        }),
        style_json: JSON.stringify({
          backgroundColor: '#ff6b6b',
          textColor: '#ffffff',
          fontSize: '16px',
          height: '60px',
          position: 'top',
        }),
        default_triggers_json: JSON.stringify([
          { category: 'time', type: 'page_load_delay', operator: 'equals', value: '3' },
        ]),
        default_dismissals_json: JSON.stringify([
          { type: 'click', subtype: 'close_button', dismissal_type: 'permanent_session' },
          { type: 'time', subtype: 'auto_dismiss', value: '60', dismissal_type: 'temporary' },
        ]),
        is_system_template: 'TRUE',
        created_at: new Date().toISOString(),
      },
      {
        template_id: 'email_capture_template',
        name: 'Email Capture Form',
        description: 'Classic email opt-in pop-up with discount incentive',
        category: 'email_capture',
        layout_type: 'modal',
        preview_image_url: '',
        content_json: JSON.stringify({
          headline: 'Get 10% Off Your First Order',
          subtext: 'Join our email list and receive exclusive offers!',
          fields: [{ type: 'email', placeholder: 'Enter your email', required: true }],
          button_text: 'Get Discount',
          success_message: 'Check your email for the code!',
        }),
        style_json: JSON.stringify({
          backgroundColor: '#ffffff',
          textColor: '#333333',
          buttonColor: '#4CAF50',
          borderRadius: '12px',
          width: '400px',
          height: '500px',
        }),
        default_triggers_json: JSON.stringify([
          { category: 'user_action', type: 'exit_intent', operator: 'equals', value: 'true' },
          { category: 'user_action', type: 'scroll_depth', operator: 'gt', value: '30' },
        ]),
        default_dismissals_json: JSON.stringify([
          { type: 'state_change', subtype: 'email_submitted', dismissal_type: 'permanent_user' },
        ]),
        is_system_template: 'TRUE',
        created_at: new Date().toISOString(),
      },
      {
        template_id: 'gamification_wheel_template',
        name: 'Spin-to-Win Wheel',
        description: 'Interactive spinning wheel for discount reveals',
        category: 'gamification',
        layout_type: 'modal',
        preview_image_url: '',
        content_json: JSON.stringify({
          headline: 'Spin to Win!',
          subtext: 'Try your luck for a discount',
          prizes: [
            { label: '5% Off', probability: 0.3 },
            { label: '10% Off', probability: 0.25 },
            { label: '15% Off', probability: 0.2 },
            { label: '20% Off', probability: 0.15 },
            { label: 'Free Shipping', probability: 0.08 },
            { label: 'Better Luck Next Time', probability: 0.02 },
          ],
          email_required: true,
          button_text: 'Spin the Wheel',
        }),
        style_json: JSON.stringify({
          wheelColors: ['#ff6b6b', '#4CAF50', '#2196F3', '#FFC107', '#9C27B0', '#FF5722'],
          backgroundColor: '#ffffff',
          textColor: '#333333',
          width: '500px',
          height: '600px',
        }),
        default_triggers_json: JSON.stringify([
          { category: 'cohort', type: 'first_time_visitor', operator: 'equals', value: 'true' },
          { category: 'time', type: 'time_on_site', operator: 'gt', value: '10' },
        ]),
        default_dismissals_json: JSON.stringify([
          { type: 'state_change', subtype: 'wheel_spun', dismissal_type: 'permanent_user' },
        ]),
        is_system_template: 'TRUE',
        created_at: new Date().toISOString(),
      },
    ];

    await sheet.addRows(templates);
  }

  /**
   * Get all popups for a merchant
   */
  async getPopups(): Promise<any[]> {
    if (!this.doc) throw new Error('Not connected to spreadsheet');

    const sheet = this.doc.sheetsByTitle['Popups'];
    if (!sheet) throw new Error('Popups sheet not found');

    const rows = await sheet.getRows();
    return rows.map((row: any) => ({
      popup_id: row.get('popup_id'),
      name: row.get('name'),
      status: row.get('status'),
      type: row.get('type'),
      template_id: row.get('template_id'),
      content_json: row.get('content_json') ? JSON.parse(row.get('content_json')) : {},
      style_json: row.get('style_json') ? JSON.parse(row.get('style_json')) : {},
      placement: row.get('placement'),
      overlay_settings_json: row.get('overlay_settings_json') ? JSON.parse(row.get('overlay_settings_json')) : {},
      z_index: parseInt(row.get('z_index') || '1000'),
      animations_json: row.get('animations_json') ? JSON.parse(row.get('animations_json')) : {},
      preview_enabled: row.get('preview_enabled') === 'TRUE',
      preview_settings_json: row.get('preview_settings_json') ? JSON.parse(row.get('preview_settings_json')) : {},
      created_at: row.get('created_at'),
      updated_at: row.get('updated_at'),
      created_by: row.get('created_by'),
    }));
  }

  /**
   * Create a new popup
   */
  async createPopup(popupData: any): Promise<string> {
    if (!this.doc) throw new Error('Not connected to spreadsheet');

    const sheet = this.doc.sheetsByTitle['Popups'];
    if (!sheet) throw new Error('Popups sheet not found');

    const popupId = uuidv4();
    const now = new Date().toISOString();

    await sheet.addRow({
      popup_id: popupId,
      name: popupData.name,
      status: popupData.status || 'draft',
      type: popupData.type,
      template_id: popupData.template_id || '',
      content_json: JSON.stringify(popupData.content || {}),
      style_json: JSON.stringify(popupData.style || {}),
      placement: popupData.placement || 'center',
      overlay_settings_json: JSON.stringify(popupData.overlay_settings || {}),
      z_index: popupData.z_index || 1000,
      animations_json: JSON.stringify(popupData.animations || {}),
      preview_enabled: popupData.preview_enabled ? 'TRUE' : 'FALSE',
      preview_settings_json: JSON.stringify(popupData.preview_settings || {}),
      created_at: now,
      updated_at: now,
      created_by: popupData.created_by || '',
    });

    console.log(`Created popup: ${popupId}`);
    return popupId;
  }

  /**
   * Get all templates
   */
  async getTemplates(): Promise<any[]> {
    if (!this.doc) throw new Error('Not connected to spreadsheet');

    const sheet = this.doc.sheetsByTitle['Templates'];
    if (!sheet) throw new Error('Templates sheet not found');

    const rows = await sheet.getRows();
    return rows.map((row: any) => ({
      template_id: row.get('template_id'),
      name: row.get('name'),
      description: row.get('description'),
      category: row.get('category'),
      layout_type: row.get('layout_type'),
      preview_image_url: row.get('preview_image_url'),
      content_json: row.get('content_json') ? JSON.parse(row.get('content_json')) : {},
      style_json: row.get('style_json') ? JSON.parse(row.get('style_json')) : {},
      default_triggers_json: row.get('default_triggers_json') ? JSON.parse(row.get('default_triggers_json')) : [],
      default_dismissals_json: row.get('default_dismissals_json') ? JSON.parse(row.get('default_dismissals_json')) : [],
      is_system_template: row.get('is_system_template') === 'TRUE',
      created_at: row.get('created_at'),
    }));
  }
}

// Export singleton instance
let googleSheetsService: GoogleSheetsService | null = null;

export function getGoogleSheetsService(): GoogleSheetsService {
  if (!googleSheetsService) {
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;

    if (!clientEmail || !privateKey) {
      throw new Error('Google Sheets credentials not configured. Please set GOOGLE_SHEETS_CLIENT_EMAIL and GOOGLE_SHEETS_PRIVATE_KEY environment variables.');
    }

    googleSheetsService = new GoogleSheetsService({
      clientEmail,
      privateKey,
    });
  }

  return googleSheetsService;
}
