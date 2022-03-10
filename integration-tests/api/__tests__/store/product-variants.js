const path = require("path")
const setupServer = require("../../../helpers/setup-server")
const { useApi } = require("../../../helpers/use-api")
const { initDb, useDb } = require("../../../helpers/use-db")

const productSeeder = require("../../helpers/product-seeder")
const storeProductSeeder = require("../../helpers/store-product-seeder")
jest.setTimeout(30000)
describe("/store/variants", () => {
  let medusaProcess
  let dbConnection

  beforeAll(async () => {
    const cwd = path.resolve(path.join(__dirname, "..", ".."))
    dbConnection = await initDb({ cwd })
    medusaProcess = await setupServer({ cwd })
  })

  afterAll(async () => {
    const db = useDb()
    await db.shutdown()
    medusaProcess.kill()
  })

  describe("GET /store/variants", () => {
    beforeEach(async () => {
      try {
        await productSeeder(dbConnection)
      } catch (err) {
        console.log(err)
        throw err
      }
    })

    afterEach(async () => {
      const db = useDb()
      await db.teardown()
    })

    it("includes default relations", async () => {
      const api = useApi()

      const response = await api.get("/store/variants?ids=test-variant")

      expect(response.data).toMatchSnapshot({
        variants: [
          {
            allow_backorder: false,
            barcode: "test-barcode",
            created_at: expect.any(String),
            deleted_at: null,
            ean: "test-ean",
            height: null,
            hs_code: null,
            id: "test-variant",
            inventory_quantity: 10,
            length: null,
            manage_inventory: true,
            material: null,
            metadata: null,
            mid_code: null,
            origin_country: null,
            product_id: "test-product",
            sku: "test-sku",
            title: "Test variant",
            upc: "test-upc",
            updated_at: expect.any(String),
            weight: null,
            width: null,
            options: [
              {
                created_at: expect.any(String),
                updated_at: expect.any(String),
              },
            ],
            prices: [
              {
                created_at: expect.any(String),
                updated_at: expect.any(String),
                amount: 100,
                currency_code: "usd",
                deleted_at: null,
                id: "test-price",
                region_id: null,
                variant_id: "test-variant",
              },
            ],
            product: expect.any(Object),
          },
        ],
      })
    })

    it("/test-variant", async () => {
      const api = useApi()

      const response = await api.get("/store/variants/test-variant")

      expect(response.data).toMatchSnapshot({
        variant: {
          allow_backorder: false,
          barcode: "test-barcode",
          created_at: expect.any(String),
          deleted_at: null,
          ean: "test-ean",
          height: null,
          hs_code: null,
          id: "test-variant",
          inventory_quantity: 10,
          length: null,
          manage_inventory: true,
          material: null,
          metadata: null,
          mid_code: null,
          origin_country: null,
          product_id: "test-product",
          sku: "test-sku",
          title: "Test variant",
          upc: "test-upc",
          updated_at: expect.any(String),
          weight: null,
          width: null,
          options: [
            {
              created_at: expect.any(String),
              updated_at: expect.any(String),
            },
          ],
          prices: [
            {
              created_at: expect.any(String),
              updated_at: expect.any(String),
              amount: 100,
              currency_code: "usd",
              deleted_at: null,
              id: "test-price",
              region_id: null,
              variant_id: "test-variant",
            },
          ],
          product: expect.any(Object),
        },
      })
    })
  })

  describe("GET /store/variants advanced pricing", () => {
    beforeEach(async () => {
      try {
        await storeProductSeeder(dbConnection)
      } catch (err) {
        console.log(err)
        throw err
      }
    })

    afterEach(async () => {
      const db = useDb()
      await db.teardown()
    })

    it("sets additional prices correctly when querying a variant", async () => {
      const api = useApi()

      const response = await api
        .get("/store/variants/test-variant?cart_id=test-cart")
        .catch((error) => console.log(error))

      expect(response.data).toMatchSnapshot({
        variant: {
          id: "test-variant",
          inventory_quantity: 10,
          title: "Test variant",
          sku: "test-sku",
          ean: "test-ean",
          upc: "test-upc",
          barcode: "test-barcode",
          product_id: "test-product",
          allow_backorder: false,
          created_at: expect.any(String),
          deleted_at: null,
          height: null,
          hs_code: null,
          length: null,
          manage_inventory: true,
          material: null,
          metadata: null,
          mid_code: null,
          origin_country: null,
          updated_at: expect.any(String),
          weight: null,
          width: null,
          options: [
            {
              id: "test-variant-option",
              value: "Default variant",
              option_id: "test-option",
              created_at: expect.any(String),
              updated_at: expect.any(String),
            },
          ],
          prices: [
            {
              created_at: expect.any(String),
              updated_at: expect.any(String),
              amount: 100,
              currency_code: "usd",
              deleted_at: null,
              type: "default",
              id: "test-price",
              region_id: null,
              variant_id: "test-variant",
            },
            {
              created_at: expect.any(String),
              updated_at: expect.any(String),
              starts_at: expect.any(String),
              ends_at: expect.any(String),
              amount: 80,
              currency_code: "usd",
              type: "sale",
              deleted_at: null,
              id: "test-price-discount",
              region_id: null,
              variant_id: "test-variant",
            },
            {
              created_at: expect.any(String),
              updated_at: expect.any(String),
              starts_at: expect.any(String),
              ends_at: expect.any(String),
              amount: 80,
              currency_code: "usd",
              type: "sale",
              deleted_at: null,
              id: "test-price-discount-expired",
              region_id: null,
              variant_id: "test-variant",
            },
          ],
          additional_prices: {
            originalPrice: 100,
            calculatedPrice: 80,
            prices: [
              {
                created_at: expect.any(String),
                updated_at: expect.any(String),
                amount: 100,
                currency_code: "usd",
                deleted_at: null,
                id: "test-price",
                type: "default",
                region_id: null,
                variant_id: "test-variant",
              },
              {
                created_at: expect.any(String),
                updated_at: expect.any(String),
                starts_at: expect.any(String),
                ends_at: expect.any(String),
                amount: 80,
                currency_code: "usd",
                type: "sale",
                deleted_at: null,
                id: "test-price-discount",
                region_id: null,
                variant_id: "test-variant",
              },
            ],
          },
          product: expect.any(Object),
        },
      })
    })
  })
})
