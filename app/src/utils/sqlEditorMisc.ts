const sqlCommands = (
    command: string,
): { columns: string[]; table: string | null } => {
  const cleanedCommand = command.trim().replace(/\s+/g, " ").toLowerCase();

  const result = {
    columns: [] as string[],
    table: null as string | null,
  };

  const fromMatch = cleanedCommand.match(/from\s+([a-zA-Z0-9_]+)/);
  if (fromMatch) result.table = fromMatch[1];

  const selectMatch = cleanedCommand.match(/select\s+(.+?)\s+from/);
  if (selectMatch) {
    const columnsPart = selectMatch[1].trim();
    result.columns =
        columnsPart === "*"
            ? ["*"]
            : columnsPart.split(",").map((col) => col.trim());
  }

  return result;
};

export {sqlCommands};
