var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createApiKeysWorkflow, createInventoryLevelsWorkflow, createProductCategoriesWorkflow, createProductsWorkflow, createRegionsWorkflow, createSalesChannelsWorkflow, createShippingOptionsWorkflow, createShippingProfilesWorkflow, createStockLocationsWorkflow, createTaxRegionsWorkflow, linkSalesChannelsToApiKeyWorkflow, linkSalesChannelsToStockLocationWorkflow, updateStoresWorkflow, } from "@medusajs/medusa/core-flows";
import { ContainerRegistrationKeys, Modules, ProductStatus } from "@medusajs/framework/utils";
export default function seedDemoData(_a) {
    return __awaiter(this, arguments, void 0, function* ({ container }) {
        const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
        const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);
        const query = container.resolve(ContainerRegistrationKeys.QUERY);
        const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
        const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
        const storeModuleService = container.resolve(Modules.STORE);
        const countries = ["gb", "de", "dk", "se", "fr", "es", "it"];
        logger.info("Seeding store data...");
        const [store] = yield storeModuleService.listStores();
        let defaultSalesChannel = yield salesChannelModuleService.listSalesChannels({
            name: "Default Sales Channel",
        });
        if (!defaultSalesChannel.length) {
            // create the default sales channel
            const { result: salesChannelResult } = yield createSalesChannelsWorkflow(container).run({
                input: {
                    salesChannelsData: [
                        {
                            name: "Default Sales Channel",
                        },
                    ],
                },
            });
            defaultSalesChannel = salesChannelResult;
        }
        yield updateStoresWorkflow(container).run({
            input: {
                selector: { id: store.id },
                update: {
                    supported_currencies: [
                        {
                            currency_code: "eur",
                            is_default: true,
                        },
                        {
                            currency_code: "usd",
                        },
                    ],
                    default_sales_channel_id: defaultSalesChannel[0].id,
                },
            },
        });
        logger.info("Seeding region data...");
        const { result: regionResult } = yield createRegionsWorkflow(container).run({
            input: {
                regions: [
                    {
                        name: "Europe",
                        currency_code: "eur",
                        countries,
                        payment_providers: ["pp_system_default"],
                    },
                ],
            },
        });
        const region = regionResult[0];
        logger.info("Finished seeding regions.");
        logger.info("Seeding tax regions...");
        yield createTaxRegionsWorkflow(container).run({
            input: countries.map((country_code) => ({
                country_code,
            })),
        });
        logger.info("Finished seeding tax regions.");
        logger.info("Seeding stock location data...");
        const { result: stockLocationResult } = yield createStockLocationsWorkflow(container).run({
            input: {
                locations: [
                    {
                        name: "European Warehouse",
                        address: {
                            city: "Copenhagen",
                            country_code: "DK",
                            address_1: "",
                        },
                    },
                ],
            },
        });
        const stockLocation = stockLocationResult[0];
        yield remoteLink.create({
            [Modules.STOCK_LOCATION]: {
                stock_location_id: stockLocation.id,
            },
            [Modules.FULFILLMENT]: {
                fulfillment_provider_id: "manual_manual",
            },
        });
        logger.info("Seeding fulfillment data...");
        const { result: shippingProfileResult } = yield createShippingProfilesWorkflow(container).run({
            input: {
                data: [
                    {
                        name: "Default",
                        type: "default",
                    },
                ],
            },
        });
        const shippingProfile = shippingProfileResult[0];
        const fulfillmentSet = yield fulfillmentModuleService.createFulfillmentSets({
            name: "European Warehouse delivery",
            type: "shipping",
            service_zones: [
                {
                    name: "Europe",
                    geo_zones: [
                        {
                            country_code: "gb",
                            type: "country",
                        },
                        {
                            country_code: "de",
                            type: "country",
                        },
                        {
                            country_code: "dk",
                            type: "country",
                        },
                        {
                            country_code: "se",
                            type: "country",
                        },
                        {
                            country_code: "fr",
                            type: "country",
                        },
                        {
                            country_code: "es",
                            type: "country",
                        },
                        {
                            country_code: "it",
                            type: "country",
                        },
                    ],
                },
            ],
        });
        yield remoteLink.create({
            [Modules.STOCK_LOCATION]: {
                stock_location_id: stockLocation.id,
            },
            [Modules.FULFILLMENT]: {
                fulfillment_set_id: fulfillmentSet.id,
            },
        });
        yield createShippingOptionsWorkflow(container).run({
            input: [
                {
                    name: "Standard Shipping",
                    price_type: "flat",
                    provider_id: "manual_manual",
                    service_zone_id: fulfillmentSet.service_zones[0].id,
                    shipping_profile_id: shippingProfile.id,
                    type: {
                        label: "Standard",
                        description: "Ship in 2-3 days.",
                        code: "standard",
                    },
                    prices: [
                        {
                            currency_code: "usd",
                            amount: 10,
                        },
                        {
                            currency_code: "eur",
                            amount: 10,
                        },
                        {
                            region_id: region.id,
                            amount: 10,
                        },
                    ],
                    rules: [
                        {
                            attribute: "enabled_in_store",
                            value: '"true"',
                            operator: "eq",
                        },
                        {
                            attribute: "is_return",
                            value: "false",
                            operator: "eq",
                        },
                    ],
                },
                {
                    name: "Express Shipping",
                    price_type: "flat",
                    provider_id: "manual_manual",
                    service_zone_id: fulfillmentSet.service_zones[0].id,
                    shipping_profile_id: shippingProfile.id,
                    type: {
                        label: "Express",
                        description: "Ship in 24 hours.",
                        code: "express",
                    },
                    prices: [
                        {
                            currency_code: "usd",
                            amount: 10,
                        },
                        {
                            currency_code: "eur",
                            amount: 10,
                        },
                        {
                            region_id: region.id,
                            amount: 10,
                        },
                    ],
                    rules: [
                        {
                            attribute: "enabled_in_store",
                            value: '"true"',
                            operator: "eq",
                        },
                        {
                            attribute: "is_return",
                            value: "false",
                            operator: "eq",
                        },
                    ],
                },
            ],
        });
        logger.info("Finished seeding fulfillment data.");
        yield linkSalesChannelsToStockLocationWorkflow(container).run({
            input: {
                id: stockLocation.id,
                add: [defaultSalesChannel[0].id],
            },
        });
        logger.info("Finished seeding stock location data.");
        logger.info("Seeding publishable API key data...");
        const { result: publishableApiKeyResult } = yield createApiKeysWorkflow(container).run({
            input: {
                api_keys: [
                    {
                        title: "Webshop",
                        type: "publishable",
                        created_by: "",
                    },
                ],
            },
        });
        const publishableApiKey = publishableApiKeyResult[0];
        yield linkSalesChannelsToApiKeyWorkflow(container).run({
            input: {
                id: publishableApiKey.id,
                add: [defaultSalesChannel[0].id],
            },
        });
        logger.info("Finished seeding publishable API key data.");
        logger.info("Seeding product data...");
        const { result: categoryResult } = yield createProductCategoriesWorkflow(container).run({
            input: {
                product_categories: [
                    {
                        name: "Shirts",
                        is_active: true,
                    },
                    {
                        name: "Sweatshirts",
                        is_active: true,
                    },
                    {
                        name: "Pants",
                        is_active: true,
                    },
                    {
                        name: "Merch",
                        is_active: true,
                    },
                ],
            },
        });
        yield createProductsWorkflow(container).run({
            input: {
                products: [
                    {
                        title: "Medusa T-Shirt",
                        category_ids: [
                            categoryResult.find((cat) => cat.name === "Shirts").id,
                        ],
                        description: "Reimagine the feeling of a classic T-shirt. With our cotton T-shirts, everyday essentials no longer have to be ordinary.",
                        handle: "t-shirt",
                        weight: 400,
                        status: ProductStatus.PUBLISHED,
                        images: [
                            {
                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png",
                            },
                            {
                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-back.png",
                            },
                            {
                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-white-front.png",
                            },
                            {
                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-white-back.png",
                            },
                        ],
                        options: [
                            {
                                title: "Size",
                                values: ["S", "M", "L", "XL"],
                            },
                            {
                                title: "Color",
                                values: ["Black", "White"],
                            },
                        ],
                        variants: [
                            {
                                title: "S / Black",
                                sku: "SHIRT-S-BLACK",
                                options: {
                                    Size: "S",
                                    Color: "Black",
                                },
                                prices: [
                                    {
                                        amount: 10,
                                        currency_code: "eur",
                                    },
                                    {
                                        amount: 15,
                                        currency_code: "usd",
                                    },
                                ],
                            },
                            {
                                title: "S / White",
                                sku: "SHIRT-S-WHITE",
                                options: {
                                    Size: "S",
                                    Color: "White",
                                },
                                prices: [
                                    {
                                        amount: 10,
                                        currency_code: "eur",
                                    },
                                    {
                                        amount: 15,
                                        currency_code: "usd",
                                    },
                                ],
                            },
                            {
                                title: "M / Black",
                                sku: "SHIRT-M-BLACK",
                                options: {
                                    Size: "M",
                                    Color: "Black",
                                },
                                prices: [
                                    {
                                        amount: 10,
                                        currency_code: "eur",
                                    },
                                    {
                                        amount: 15,
                                        currency_code: "usd",
                                    },
                                ],
                            },
                            {
                                title: "M / White",
                                sku: "SHIRT-M-WHITE",
                                options: {
                                    Size: "M",
                                    Color: "White",
                                },
                                prices: [
                                    {
                                        amount: 10,
                                        currency_code: "eur",
                                    },
                                    {
                                        amount: 15,
                                        currency_code: "usd",
                                    },
                                ],
                            },
                            {
                                title: "L / Black",
                                sku: "SHIRT-L-BLACK",
                                options: {
                                    Size: "L",
                                    Color: "Black",
                                },
                                prices: [
                                    {
                                        amount: 10,
                                        currency_code: "eur",
                                    },
                                    {
                                        amount: 15,
                                        currency_code: "usd",
                                    },
                                ],
                            },
                            {
                                title: "L / White",
                                sku: "SHIRT-L-WHITE",
                                options: {
                                    Size: "L",
                                    Color: "White",
                                },
                                prices: [
                                    {
                                        amount: 10,
                                        currency_code: "eur",
                                    },
                                    {
                                        amount: 15,
                                        currency_code: "usd",
                                    },
                                ],
                            },
                            {
                                title: "XL / Black",
                                sku: "SHIRT-XL-BLACK",
                                options: {
                                    Size: "XL",
                                    Color: "Black",
                                },
                                prices: [
                                    {
                                        amount: 10,
                                        currency_code: "eur",
                                    },
                                    {
                                        amount: 15,
                                        currency_code: "usd",
                                    },
                                ],
                            },
                            {
                                title: "XL / White",
                                sku: "SHIRT-XL-WHITE",
                                options: {
                                    Size: "XL",
                                    Color: "White",
                                },
                                prices: [
                                    {
                                        amount: 10,
                                        currency_code: "eur",
                                    },
                                    {
                                        amount: 15,
                                        currency_code: "usd",
                                    },
                                ],
                            },
                        ],
                        sales_channels: [
                            {
                                id: defaultSalesChannel[0].id,
                            },
                        ],
                    },
                    {
                        title: "Medusa Sweatshirt",
                        category_ids: [
                            categoryResult.find((cat) => cat.name === "Sweatshirts").id,
                        ],
                        description: "Reimagine the feeling of a classic sweatshirt. With our cotton sweatshirt, everyday essentials no longer have to be ordinary.",
                        handle: "sweatshirt",
                        weight: 400,
                        status: ProductStatus.PUBLISHED,
                        images: [
                            {
                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-front.png",
                            },
                            {
                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-back.png",
                            },
                        ],
                        options: [
                            {
                                title: "Size",
                                values: ["S", "M", "L", "XL"],
                            },
                        ],
                        variants: [
                            {
                                title: "S",
                                sku: "SWEATSHIRT-S",
                                options: {
                                    Size: "S",
                                },
                                prices: [
                                    {
                                        amount: 10,
                                        currency_code: "eur",
                                    },
                                    {
                                        amount: 15,
                                        currency_code: "usd",
                                    },
                                ],
                            },
                            {
                                title: "M",
                                sku: "SWEATSHIRT-M",
                                options: {
                                    Size: "M",
                                },
                                prices: [
                                    {
                                        amount: 10,
                                        currency_code: "eur",
                                    },
                                    {
                                        amount: 15,
                                        currency_code: "usd",
                                    },
                                ],
                            },
                            {
                                title: "L",
                                sku: "SWEATSHIRT-L",
                                options: {
                                    Size: "L",
                                },
                                prices: [
                                    {
                                        amount: 10,
                                        currency_code: "eur",
                                    },
                                    {
                                        amount: 15,
                                        currency_code: "usd",
                                    },
                                ],
                            },
                            {
                                title: "XL",
                                sku: "SWEATSHIRT-XL",
                                options: {
                                    Size: "XL",
                                },
                                prices: [
                                    {
                                        amount: 10,
                                        currency_code: "eur",
                                    },
                                    {
                                        amount: 15,
                                        currency_code: "usd",
                                    },
                                ],
                            },
                        ],
                        sales_channels: [
                            {
                                id: defaultSalesChannel[0].id,
                            },
                        ],
                    },
                    {
                        title: "Medusa Sweatpants",
                        category_ids: [categoryResult.find((cat) => cat.name === "Pants").id],
                        description: "Reimagine the feeling of classic sweatpants. With our cotton sweatpants, everyday essentials no longer have to be ordinary.",
                        handle: "sweatpants",
                        weight: 400,
                        status: ProductStatus.PUBLISHED,
                        images: [
                            {
                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png",
                            },
                            {
                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-back.png",
                            },
                        ],
                        options: [
                            {
                                title: "Size",
                                values: ["S", "M", "L", "XL"],
                            },
                        ],
                        variants: [
                            {
                                title: "S",
                                sku: "SWEATPANTS-S",
                                options: {
                                    Size: "S",
                                },
                                prices: [
                                    {
                                        amount: 10,
                                        currency_code: "eur",
                                    },
                                    {
                                        amount: 15,
                                        currency_code: "usd",
                                    },
                                ],
                            },
                            {
                                title: "M",
                                sku: "SWEATPANTS-M",
                                options: {
                                    Size: "M",
                                },
                                prices: [
                                    {
                                        amount: 10,
                                        currency_code: "eur",
                                    },
                                    {
                                        amount: 15,
                                        currency_code: "usd",
                                    },
                                ],
                            },
                            {
                                title: "L",
                                sku: "SWEATPANTS-L",
                                options: {
                                    Size: "L",
                                },
                                prices: [
                                    {
                                        amount: 10,
                                        currency_code: "eur",
                                    },
                                    {
                                        amount: 15,
                                        currency_code: "usd",
                                    },
                                ],
                            },
                            {
                                title: "XL",
                                sku: "SWEATPANTS-XL",
                                options: {
                                    Size: "XL",
                                },
                                prices: [
                                    {
                                        amount: 10,
                                        currency_code: "eur",
                                    },
                                    {
                                        amount: 15,
                                        currency_code: "usd",
                                    },
                                ],
                            },
                        ],
                        sales_channels: [
                            {
                                id: defaultSalesChannel[0].id,
                            },
                        ],
                    },
                    {
                        title: "Medusa Shorts",
                        category_ids: [categoryResult.find((cat) => cat.name === "Merch").id],
                        description: "Reimagine the feeling of classic shorts. With our cotton shorts, everyday essentials no longer have to be ordinary.",
                        handle: "shorts",
                        weight: 400,
                        status: ProductStatus.PUBLISHED,
                        images: [
                            {
                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-front.png",
                            },
                            {
                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-back.png",
                            },
                        ],
                        options: [
                            {
                                title: "Size",
                                values: ["S", "M", "L", "XL"],
                            },
                        ],
                        variants: [
                            {
                                title: "S",
                                sku: "SHORTS-S",
                                options: {
                                    Size: "S",
                                },
                                prices: [
                                    {
                                        amount: 10,
                                        currency_code: "eur",
                                    },
                                    {
                                        amount: 15,
                                        currency_code: "usd",
                                    },
                                ],
                            },
                            {
                                title: "M",
                                sku: "SHORTS-M",
                                options: {
                                    Size: "M",
                                },
                                prices: [
                                    {
                                        amount: 10,
                                        currency_code: "eur",
                                    },
                                    {
                                        amount: 15,
                                        currency_code: "usd",
                                    },
                                ],
                            },
                            {
                                title: "L",
                                sku: "SHORTS-L",
                                options: {
                                    Size: "L",
                                },
                                prices: [
                                    {
                                        amount: 10,
                                        currency_code: "eur",
                                    },
                                    {
                                        amount: 15,
                                        currency_code: "usd",
                                    },
                                ],
                            },
                            {
                                title: "XL",
                                sku: "SHORTS-XL",
                                options: {
                                    Size: "XL",
                                },
                                prices: [
                                    {
                                        amount: 10,
                                        currency_code: "eur",
                                    },
                                    {
                                        amount: 15,
                                        currency_code: "usd",
                                    },
                                ],
                            },
                        ],
                        sales_channels: [
                            {
                                id: defaultSalesChannel[0].id,
                            },
                        ],
                    },
                ],
            },
        });
        logger.info("Finished seeding product data.");
        logger.info("Seeding inventory levels.");
        const { data: inventoryItems } = yield query.graph({
            entity: 'inventory_item',
            fields: ['id']
        });
        const inventoryLevels = [];
        for (const inventoryItem of inventoryItems) {
            const inventoryLevel = {
                location_id: stockLocation.id,
                stocked_quantity: 1000000,
                inventory_item_id: inventoryItem.id,
            };
            inventoryLevels.push(inventoryLevel);
        }
        yield createInventoryLevelsWorkflow(container).run({
            input: {
                inventory_levels: inventoryLevels
            },
        });
        logger.info("Finished seeding inventory levels data.");
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zY3JpcHRzL3NlZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUNMLHFCQUFxQixFQUNyQiw2QkFBNkIsRUFDN0IsK0JBQStCLEVBQy9CLHNCQUFzQixFQUN0QixxQkFBcUIsRUFDckIsMkJBQTJCLEVBQzNCLDZCQUE2QixFQUM3Qiw4QkFBOEIsRUFDOUIsNEJBQTRCLEVBQzVCLHdCQUF3QixFQUN4QixpQ0FBaUMsRUFDakMsd0NBQXdDLEVBQ3hDLG9CQUFvQixHQUNyQixNQUFNLDZCQUE2QixDQUFDO0FBSXJDLE9BQU8sRUFDTCx5QkFBeUIsRUFDekIsT0FBTyxFQUNQLGFBQWEsRUFDZCxNQUFNLDJCQUEyQixDQUFDO0FBRW5DLE1BQU0sQ0FBQyxPQUFPLFVBQWdCLFlBQVk7eURBQUMsRUFBRSxTQUFTLEVBQVk7UUFDaEUsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRSxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUNsQyx5QkFBeUIsQ0FBQyxXQUFXLENBQ3RDLENBQUM7UUFDRixNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2hFLE1BQU0sd0JBQXdCLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEUsTUFBTSx5QkFBeUIsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzRSxNQUFNLGtCQUFrQixHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTVELE1BQU0sU0FBUyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJ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