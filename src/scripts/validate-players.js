const fs = require('fs');
const path = require('path');

const PLAYERS_FILE = path.join(__dirname, '../data/players.json');

function validate() {
  console.log('🔍 Validating players.json...');
  
  if (!fs.existsSync(PLAYERS_FILE)) {
    console.error('❌ Error: players.json not found!');
    process.exit(1);
  }

  const content = fs.readFileSync(PLAYERS_FILE, 'utf-8');
  let players;

  try {
    players = JSON.parse(content);
  } catch (e) {
    console.error('❌ Error: Invalid JSON format!');
    console.error(e.message);
    process.exit(1);
  }

  if (!Array.isArray(players)) {
    console.error('❌ Error: Root element must be an array!');
    process.exit(1);
  }

  console.log(`📊 Total players found: ${players.length}`);

  const requiredFields = [
    'id', 'fullName', 'knownAs', 'dob', 'birthPlace', 
    'role', 'formats', 'eraTags', 'statsSummary', 
    'bioEn', 'bioBn', 'sourceUrls'
  ];

  const errors = [];
  const ids = new Set();

  players.forEach((player, index) => {
    const name = player.fullName || `Player at index ${index}`;
    
    // Check required fields
    requiredFields.forEach(field => {
      if (player[field] === undefined || player[field] === null || player[field] === '') {
        errors.push(`[${name}] Missing field: ${field}`);
      }
    });

    // Check for duplicate IDs
    if (player.id) {
      if (ids.has(player.id)) {
        errors.push(`[${name}] Duplicate ID: ${player.id}`);
      }
      ids.add(player.id);
    }

    // Check statsSummary structure
    if (player.statsSummary) {
      Object.keys(player.statsSummary).forEach(format => {
        const stats = player.statsSummary[format];
        if (typeof stats !== 'object') {
          errors.push(`[${name}] Invalid stats for ${format}`);
        }
      });
    }
  });

  if (errors.length > 0) {
    console.error(`\n❌ Validation failed with ${errors.length} errors:`);
    errors.forEach(err => console.error(`  - ${err}`));
    process.exit(1);
  }

  console.log('✅ Validation successful! All players meet the requirements.');
}

validate();
