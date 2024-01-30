This file is record the node-pg query results

```json
{
  "command": "SELECT",
  "rowCount": 10,
  "oid": null,
  "rows": [
    {
      "airport_code": "SZX",
      "count": "5917"
    },
    {
      "airport_code": "HKG",
      "count": "5458"
    },
    {
      "airport_code": "CKG",
      "count": "3315"
    },
    {
      "airport_code": "CAN",
      "count": "2830"
    },
    {
      "airport_code": "KIX",
      "count": "2754"
    },
    {
      "airport_code": "SHE",
      "count": "2538"
    },
    {
      "airport_code": "NRT",
      "count": "2512"
    },
    {
      "airport_code": "CGQ",
      "count": "2393"
    },
    {
      "airport_code": "HRB",
      "count": "2324"
    },
    {
      "airport_code": "CTU",
      "count": "2285"
    }
  ],
  "fields": [
    {
      "name": "airport_code",
      "tableID": 16409,
      "columnID": 3,
      "dataTypeID": 1043,
      "dataTypeSize": -1,
      "dataTypeModifier": 7,
      "format": "text"
    },
    {
      "name": "count",
      "tableID": 0,
      "columnID": 0,
      "dataTypeID": 20,
      "dataTypeSize": 8,
      "dataTypeModifier": -1,
      "format": "text"
    }
  ],
  "_parsers": [null, null],
  "_types": {
    "_types": {
      "arrayParser": {},
      "builtins": {
        "BOOL": 16,
        "BYTEA": 17,
        "CHAR": 18,
        "INT8": 20,
        "INT2": 21,
        "INT4": 23,
        "REGPROC": 24,
        "TEXT": 25,
        "OID": 26,
        "TID": 27,
        "XID": 28,
        "CID": 29,
        "JSON": 114,
        "XML": 142,
        "PG_NODE_TREE": 194,
        "SMGR": 210,
        "PATH": 602,
        "POLYGON": 604,
        "CIDR": 650,
        "FLOAT4": 700,
        "FLOAT8": 701,
        "ABSTIME": 702,
        "RELTIME": 703,
        "TINTERVAL": 704,
        "CIRCLE": 718,
        "MACADDR8": 774,
        "MONEY": 790,
        "MACADDR": 829,
        "INET": 869,
        "ACLITEM": 1033,
        "BPCHAR": 1042,
        "VARCHAR": 1043,
        "DATE": 1082,
        "TIME": 1083,
        "TIMESTAMP": 1114,
        "TIMESTAMPTZ": 1184,
        "INTERVAL": 1186,
        "TIMETZ": 1266,
        "BIT": 1560,
        "VARBIT": 1562,
        "NUMERIC": 1700,
        "REFCURSOR": 1790,
        "REGPROCEDURE": 2202,
        "REGOPER": 2203,
        "REGOPERATOR": 2204,
        "REGCLASS": 2205,
        "REGTYPE": 2206,
        "UUID": 2950,
        "TXID_SNAPSHOT": 2970,
        "PG_LSN": 3220,
        "PG_NDISTINCT": 3361,
        "PG_DEPENDENCIES": 3402,
        "TSVECTOR": 3614,
        "TSQUERY": 3615,
        "GTSVECTOR": 3642,
        "REGCONFIG": 3734,
        "REGDICTIONARY": 3769,
        "JSONB": 3802,
        "REGNAMESPACE": 4089,
        "REGROLE": 4096
      }
    },
    "text": {},
    "binary": {}
  },
  "RowCtor": null,
  "rowAsArray": false,
  "_prebuiltEmptyResultObject": {
    "airport_code": null,
    "count": null
  }
}
```

```json
{
  "command": "SELECT",
  "rowCount": 10,
  "oid": null,
  "rows": [
    {
      "id": "6586bdb2f22879d1d2c934f9",
      "flight_number": "NSJ501",
      "airport_code": "INC",
      "actual_at": "2023-12-24T02:52:00.000Z",
      "created_at": "2023-12-23T11:00:02.651Z",
      "estimated_at": null,
      "source_departure_at": "2023-12-23T16:37:00.000Z",
      "status": "synced"
    },
    {
      "id": "657ee377f2287925f372e485",
      "flight_number": "9C9919",
      "airport_code": "YTY",
      "actual_at": null,
      "created_at": "2023-12-17T12:03:03.079Z",
      "estimated_at": null,
      "source_departure_at": "2023-12-17T03:50:00.000Z",
      "status": "synced"
    },
    {
      "id": "6519564cf22879eab86706d5",
      "flight_number": "9C9910",
      "airport_code": "NGB",
      "actual_at": "2023-10-01T11:32:00.000Z",
      "created_at": "2023-10-01T11:21:48.151Z",
      "estimated_at": null,
      "source_departure_at": "2023-10-01T03:05:00.000Z",
      "status": "synced"
    },
    {
      "id": "65163dbbf2287935eb7bf6c7",
      "flight_number": "O33010",
      "airport_code": "PEK",
      "actual_at": "2023-09-29T04:34:00.000Z",
      "created_at": "2023-09-29T03:00:11.675Z",
      "estimated_at": null,
      "source_departure_at": "2023-09-28T18:48:00.000Z",
      "status": "synced"
    },
    {
      "id": "6515b12bf2287967cba4f13f",
      "flight_number": "O3680T",
      "airport_code": "CTU",
      "actual_at": "2023-09-28T19:06:00.000Z",
      "created_at": "2023-09-28T17:00:27.020Z",
      "estimated_at": null,
      "source_departure_at": "2023-09-28T08:48:00.000Z",
      "status": "synced"
    },
    {
      "id": "651075eff22879633a67dab5",
      "flight_number": "B321G",
      "airport_code": "URC",
      "actual_at": null,
      "created_at": "2023-09-24T17:46:23.336Z",
      "estimated_at": null,
      "source_departure_at": "2023-09-24T05:50:42.891Z",
      "status": "synced"
    },
    {
      "id": "65107573f22879ae8a6700cc",
      "flight_number": "B321G",
      "airport_code": "URC",
      "actual_at": null,
      "created_at": "2023-09-24T17:44:19.416Z",
      "estimated_at": null,
      "source_departure_at": "2023-09-24T05:50:02.873Z",
      "status": "synced"
    },
    {
      "id": "64f7d648f2287923f34112c7",
      "flight_number": "LXJ663",
      "airport_code": "NRT",
      "actual_at": "2023-09-06T03:49:00.000Z",
      "created_at": "2023-09-06T01:30:48.489Z",
      "estimated_at": null,
      "source_departure_at": "2023-09-05T17:21:00.000Z",
      "status": "synced"
    },
    {
      "id": "64eca518f228792b18ac4533",
      "flight_number": "9C7550",
      "airport_code": "SHE",
      "actual_at": "2023-08-28T13:36:00.000Z",
      "created_at": "2023-08-28T13:46:00.906Z",
      "estimated_at": null,
      "source_departure_at": "2023-08-28T03:31:00.000Z",
      "status": "synced"
    },
    {
      "id": "64e81cdff22879c5b16c2475",
      "flight_number": "NSJ202",
      "airport_code": "KJI",
      "actual_at": "2023-08-25T07:39:00.000Z",
      "created_at": "2023-08-25T03:15:43.705Z",
      "estimated_at": null,
      "source_departure_at": "2023-08-24T19:06:00.000Z",
      "status": "synced"
    }
  ],
  "fields": [
    {
      "name": "id",
      "tableID": 16409,
      "columnID": 1,
      "dataTypeID": 1043,
      "dataTypeSize": -1,
      "dataTypeModifier": 28,
      "format": "text"
    },
    {
      "name": "flight_number",
      "tableID": 16409,
      "columnID": 2,
      "dataTypeID": 1043,
      "dataTypeSize": -1,
      "dataTypeModifier": 14,
      "format": "text"
    },
    {
      "name": "airport_code",
      "tableID": 16409,
      "columnID": 3,
      "dataTypeID": 1043,
      "dataTypeSize": -1,
      "dataTypeModifier": 7,
      "format": "text"
    },
    {
      "name": "actual_at",
      "tableID": 16409,
      "columnID": 4,
      "dataTypeID": 1184,
      "dataTypeSize": 8,
      "dataTypeModifier": -1,
      "format": "text"
    },
    {
      "name": "created_at",
      "tableID": 16409,
      "columnID": 6,
      "dataTypeID": 1184,
      "dataTypeSize": 8,
      "dataTypeModifier": -1,
      "format": "text"
    },
    {
      "name": "estimated_at",
      "tableID": 16409,
      "columnID": 7,
      "dataTypeID": 1184,
      "dataTypeSize": 8,
      "dataTypeModifier": -1,
      "format": "text"
    },
    {
      "name": "source_departure_at",
      "tableID": 16409,
      "columnID": 9,
      "dataTypeID": 1114,
      "dataTypeSize": 8,
      "dataTypeModifier": -1,
      "format": "text"
    },
    {
      "name": "status",
      "tableID": 16409,
      "columnID": 10,
      "dataTypeID": 1043,
      "dataTypeSize": -1,
      "dataTypeModifier": 34,
      "format": "text"
    }
  ],
  "_parsers": [null, null, null, null, null, null, null, null],
  "_types": {
    "_types": {
      "arrayParser": {},
      "builtins": {
        "BOOL": 16,
        "BYTEA": 17,
        "CHAR": 18,
        "INT8": 20,
        "INT2": 21,
        "INT4": 23,
        "REGPROC": 24,
        "TEXT": 25,
        "OID": 26,
        "TID": 27,
        "XID": 28,
        "CID": 29,
        "JSON": 114,
        "XML": 142,
        "PG_NODE_TREE": 194,
        "SMGR": 210,
        "PATH": 602,
        "POLYGON": 604,
        "CIDR": 650,
        "FLOAT4": 700,
        "FLOAT8": 701,
        "ABSTIME": 702,
        "RELTIME": 703,
        "TINTERVAL": 704,
        "CIRCLE": 718,
        "MACADDR8": 774,
        "MONEY": 790,
        "MACADDR": 829,
        "INET": 869,
        "ACLITEM": 1033,
        "BPCHAR": 1042,
        "VARCHAR": 1043,
        "DATE": 1082,
        "TIME": 1083,
        "TIMESTAMP": 1114,
        "TIMESTAMPTZ": 1184,
        "INTERVAL": 1186,
        "TIMETZ": 1266,
        "BIT": 1560,
        "VARBIT": 1562,
        "NUMERIC": 1700,
        "REFCURSOR": 1790,
        "REGPROCEDURE": 2202,
        "REGOPER": 2203,
        "REGOPERATOR": 2204,
        "REGCLASS": 2205,
        "REGTYPE": 2206,
        "UUID": 2950,
        "TXID_SNAPSHOT": 2970,
        "PG_LSN": 3220,
        "PG_NDISTINCT": 3361,
        "PG_DEPENDENCIES": 3402,
        "TSVECTOR": 3614,
        "TSQUERY": 3615,
        "GTSVECTOR": 3642,
        "REGCONFIG": 3734,
        "REGDICTIONARY": 3769,
        "JSONB": 3802,
        "REGNAMESPACE": 4089,
        "REGROLE": 4096
      }
    },
    "text": {},
    "binary": {}
  },
  "RowCtor": null,
  "rowAsArray": false,
  "_prebuiltEmptyResultObject": {
    "id": null,
    "flight_number": null,
    "airport_code": null,
    "actual_at": null,
    "created_at": null,
    "estimated_at": null,
    "source_departure_at": null,
    "status": null
  }
}
```
